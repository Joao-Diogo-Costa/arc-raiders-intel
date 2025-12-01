import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Configuração de Ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Validação de variáveis
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.GOOGLE_API_KEY) {
  console.error('❌ Erro: Faltam variáveis no .env.local');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// --- DADOS DE ENTRADA ---
const RAW_PATCH_TEXT = `
Update 1.4.0
November 27, 2025

Raiders!

Update 1.4.0 is now rolling out on all platforms. It may be quite a small one but the big news is that the gun quick swap exploit has been patched and we have made a very hot fix for the locked room exploits.

Make sure to restart your client to start the download.
Content and Bug Fixes

    Exploit mitigation mechanisms have been added for all locked rooms across all maps.
    Fixed the gun exploit that allowed you to shoot quicker than intended by swapping to a quick use item and back.
    The exterior access to Spaceport's Control Tower locked room has been blocked off.
    Fixed the issue that sometimes caused low resolution textures in the Main Menu.
    Fixed players being able to push each other by jumping on each other’s backs.
    Fixed lighting artifacts that would sometimes occur upon entering maps.
    Raider Voice now correctly respects the selected voice option after restarting the game.
`;
const VERSION_NUMBER = "1.4.0";
// -----------------------

async function main() {
  console.log("🤖 1. A pedir ao Google Gemini (Modelo Pro) para analisar...");

  try {
    // Usamos 'gemini-pro' que é universalmente disponível
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-pro" 
    });

    const prompt = `
    You are an expert game data analyst.
    Extract the Patch Version, Date, and Changes from the text below into a valid JSON format.
    Do NOT use Markdown formatting. Just return the raw JSON string.

    Output Schema:
    {
      "version_number": "The update number found in text (e.g. '1.4.0')",
      "release_date": "The date found in text converted to ISO format (YYYY-MM-DD)",
      "changes": [
        {
          "entity_name": "Name of the weapon/enemy/feature",
          "type": "one of: buff, nerf, fix, new, adjustment",
          "simplified_text": "A short, casual summary for gamers",
          "official_text": "The original text"
        }
      ]
    }

    Patch Notes:
    "${RAW_PATCH_TEXT}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const data = JSON.parse(text);

    // Validação básica
    if (!data.version_number || !data.changes) {
      console.error("❌ Dados incompletos retornados pela IA.");
      return;
    }

    console.log(`✅ Detetado: Versão ${data.version_number} de ${data.release_date}`);

    // A) Criar a Patch (Usando dados da IA)
    const { data: patch, error: patchError } = await supabase
      .from('patches')
      .insert({
        version_number: data.version_number, // Vem da IA
        release_date: data.release_date || new Date().toISOString(), // Vem da IA
        is_published: true,
      })
      .select()
      .single();

    if (patchError) throw new Error(`Erro Supabase Patch: ${patchError.message}`);

    // B) Inserir Mudanças
    const formattedChanges = data.changes.map((c: any) => ({
      patch_id: patch.id,
      entity_name: c.entity_name,
      type: c.type.toLowerCase(),
      official_text: c.official_text,
      simplified_text: c.simplified_text
    }));

    const { error: changesError } = await supabase
      .from('patch_changes')
      .insert(formattedChanges);

    if (changesError) throw new Error(`Erro Supabase Changes: ${changesError.message}`);

    console.log(`🚀 SUCESSO! Patch ${data.version_number} inserida com ${formattedChanges.length} itens.`);

  } catch (error) {
    console.error("🔥 Erro:", error);
  }
}

main();