export interface PatchChange {
  id: string;
  entity_name: string;
  simplified_text: string;
  official_text: string;
  type: 'buff' | 'nerf' | 'fix' | 'new';
}
