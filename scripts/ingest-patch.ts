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
November Update 1.2.0
November 13, 2025
ACT I - NORTH LINE

The North Line Train has arrived, prepare for extraction.

Raiders!

We‘ve discovered a secluded research facility in the mountains—Stella Montis. Work to restore the tunnels has begun, and we need you to pull your weight.
What's New?
Map

    Stella Montis

ARC

    Matriarch & Shredder

Community Unlock Event
New items to discover
New quests to accept
Patch Highlights

    Reduced character movement latency on server to improve the "desync" problem where it looks like you get damaged even after behind cover.
    Fixed an issue that prevented players from completing quests involving multiple objectives or item collections within a single round.
    Fixed various achievements not working correctly. Players will need to redo some achievements with only one objective item (e.g. “Destroy the Queen”) while achievements with multiple objectives will only need parts of them completed again.
    Reduced delay between shooting at ARC and seeing impact effects on the target.
    Fixed various locations where players could fall through the terrain.

Balance Changes
Items:
Wolfpack

    Value: From 3,000 to 5,000 Coins
    Crafting:
        Before: 2 Refined Explosives + 2 Sensors
        Now: 3 Refined Explosive + 2 ARC Motion Cores

ARC Motion Core & ARC Circuitry

    Unlock:
        Before: Refiner LVL 3
        Now: Refiner LVL 2
    Crafting:
        Before: 6 ARC Alloy
        Now: 8 ARC Alloy

Launcher Ammo

    Value: From 100 to 200 Coins (this doubles trader cost for launcher ammo)
    Crafting (6 ammo):
        Before: 5 Metal Parts + 1 Crude Explosives
        Now: 4 Metal Parts + 1 Refined Explosives

Spotter Relay

    Value: From 5,000 to 2,000 Coins

Security Lockers

    Security Lockers were over-providing valuable items and have been adjusted.

XP:
Reduced XP per Damage from 3 to 2 for:

    Bastion
    Bombardier
    Rocketeer
    Leaper

Reduced XP for Looting ARC parts:

    Bastion: From 500 to 250
    Bombardier: From 500 to 300

Increased XP for Looting ARC parts:

    Rocketeer thruster: From 200 to 500
    Leaper leg: From 200 to 500

Content and Bug Fixes
Achievements

    Fixed various achievements not working correctly. Players will need to redo some achievements with only one objective item (e.g. “Destroy the Queen”) while achievements with multiple objectives will only need parts of them completed again.

Animation

    Fixed an issue where weapons were automatically slung when throwing grenades.
    Fixed an issue where weapons were sometimes hidden when using deployables.
    Improved camera behavior to prevent clipping through walls and objects while jumping.

ARC

    Fireball enemies will no longer get stuck on security gates and will pursue the player accordingly.
    Fixed a bug where the Surveyors fleeing behavior could move it out of playable area.
    Fixed a bug which caused some enemies to take more fire damage than intended.

Audio

    Added a System Default option for voice chat input and output devices to follow your operating system’s default.
    Breathing audio has been adjusted for better balance between players with and without helmets. Breathing sounds are also less audible over distance.
    Added different audio effects to Scrappy while wearing various helmet cosmetics.

Cosmetics

    Fixed an issue where party members would initially appear with the base appearance.

Maps

    The Dam Battlegrounds
        Fixed locations in The Dam where players could fall through the terrain.
        Fixed some collision issues on The Dam where players could get stuck.
    Buried City
        Fixed locations in Buried City where players could fall through the terrain.
        Fixed various flickering and clipping issues in Buried City.
        Fixed some locations where players could get stuck in the subway stations in Buried City.
    Spaceport
        Sealed one of the rooms in Spaceport's Departure Building, making it require breaching to access. The loot inside was adjusted to fit the effort required to enter.
        Fixed an issue where certain doors could not be breached from the inside in the Launch Tower.
    Blue Gate
        Fixed an issue where players could get trapped in the Blue Gate Control Room.
    Hatches
        Fixed an issue where successfully entering a raider hatch did not grant immunity to damage and knockbacks.
        Increased interaction distance for raider hatches.

Miscellaneous

    Reduced character movement latency on server to improve the "desync" problem where it looks like you get damaged even after behind cover.
    Reduced delay between shooting at ARC and seeing impact effects on the target.
    Adjusted blueprint drop rates from Raider Containers.
    Interacting with Probes, Husks, Raider Caches, etc. now counts towards looting container objectives.
    Fixed an issue where you could not loot or knock out DBNO players on steep slopes.
    Field crafting selection now stays on the same item after crafting.

Movement

    Vaulting is now smoother.

UI

    Added an inventory item menu option for splitting stacks.
    Removed Thumb Mouse Button from the Escape action in menus to prevent unintended back navigation when that button is bound to Push-to-Talk.
    Added a confirmation message after submitting a player report to clearly indicate that the report was received.
    Certain enemy salvage items will no longer auto-assign to Quick Slots when looted (e.g. Wasp Driver), preventing unwanted quick slot fills.
    Prevent showing blocked Discord users in the social screen when the Discord integration is on.
    Changed the styling of some UI input hints.

Utility

    Fixed an issue where the Blaze Grenade Trap could deal more damage then intended.
    Reduced Tick attachment time for the Anti-Tick Field augment passive from 1 second to 0.5 seconds.
    Fixed an issue where a prompt would get stuck while fighting off Ticks at the same time as the Anti-Tick Field passive being active.
    Smoke clouds from items are now always visible at the same range as players.
    Fixed an issue where the Trigger ‘Nade explosions could bypass the brief invulnerability when entering DBNO, causing instant elimination. Invulnerability now correctly applies on downing.
    Fixed a bug allowing players to use the Snap Hook to go out of bounds in the Spaceport bunker.

Weapons

    Fixed an issue where firing while standing close to walls could cause bullets to veer sideways instead of following the crosshair.

Quests

    Fixed an issue that prevented players from completing quests involving multiple objectives or item collections within a single round.
    The Greasing Her Palm quest in Spaceport now includes more thrusters that will complete the objective.
`;
// const VERSION_NUMBER = "1.4.0";
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