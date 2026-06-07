<script lang="ts">
  import { activeCard } from '$lib/stores/cardStore';
  import type { SkillItem, LibraryItem } from '$lib/stores/cardStore';
  
  const dice = ['d4-2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd12+1', 'd12+2', 'd12+3', 'd12+4', 'd12+5'];
  
  const attributes: ('Életerő' | 'Erő' | 'Ész' | 'Lélek' | 'Ügyesség')[] = [
    'Életerő', 'Erő', 'Ész', 'Lélek', 'Ügyesség'
  ];

  let customInputs = $state({
    skills: '', edges: '', hindrances: '', abilities: '', powers: ''
  });

  type ListCategory = 'skills' | 'edges' | 'hindrances' | 'abilities' | 'powers';

  function removeItem(category: ListCategory, id: string) {
    // @ts-expect-error - TS complains about dynamic assignment of union arrays, but this is safe
    $activeCard[category] = $activeCard[category].filter((item: SkillItem | LibraryItem) => item.id !== id);
  }

  // Helper to add a custom item typed by the user
  function addCustomItem(category: ListCategory) {
    const name = customInputs[category].trim();
    if (!name) return;

    const generateId = () => Math.random().toString(36).slice(2, 10);
    
    if (category === 'skills') {
      const newItem: SkillItem = { id: generateId(), name, desc: 'Egyedi bejegyzés', die: 'd6' };
      $activeCard.skills = [...$activeCard.skills, newItem];
    } else {
      const newItem: LibraryItem = { id: generateId(), name, desc: 'Egyedi bejegyzés' };
      $activeCard[category] = [...$activeCard[category], newItem];
    }

    customInputs[category] = ''; // Clear the input after adding
  }
</script>
<div class="space-y-6">
  
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-border-default">
    <div class="flex flex-col gap-1">
      <label class="text-xs text-text-secondary" for="name-input">Név</label>
      <input id="name-input" type="text" bind:value={$activeCard.name} placeholder="pl. Vérköd lidérc" class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-xs text-text-secondary" for="type-input">Típus / Szerep</label>
      <input id="type-input" type="text" bind:value={$activeCard.type} placeholder="pl. Ász, statiszta, élőholt" class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-4 border-b border-border-default">
    <div class="flex flex-col gap-1"><label for="size" class="text-xs text-text-secondary">Méret mód.</label><input id="size" type="number" bind:value={$activeCard.sizeMod} class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent outline-none w-full" /></div>
    <div class="flex flex-col gap-1"><label for="armor" class="text-xs text-text-secondary">Páncél</label><input id="armor" type="number" bind:value={$activeCard.armor} class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent outline-none w-full" /></div>
    <div class="flex flex-col gap-1"><label for="pace" class="text-xs text-text-secondary">Iram mód.</label><input id="pace" type="number" bind:value={$activeCard.paceMod} class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent outline-none w-full" /></div>
    <div class="flex flex-col gap-1"><label for="parry" class="text-xs text-text-secondary">Hárítás mód.</label><input id="parry" type="number" bind:value={$activeCard.parryMod} class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent outline-none w-full" /></div>
    <div class="flex flex-col gap-1"><label for="tough" class="text-xs text-text-secondary">Szívósság mód.</label><input id="tough" type="number" bind:value={$activeCard.toughMod} class="bg-bg-input border border-border-default rounded-lg p-2 text-sm text-text-primary focus:border-accent outline-none w-full" /></div>
  </div>

  <div class="pb-4 border-b border-border-default">
    <h3 class="text-sm font-semibold mb-3 text-text-primary">Tulajdonságok</h3>
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {#each attributes as attr (attr)}
        <div class="bg-[#18120e] border border-border-default rounded-xl p-2 flex flex-col gap-1">
          <label class="text-xs font-bold text-[#e9d2aa] text-center" for="attr-{attr}">{attr}</label>
          <select id="attr-{attr}" bind:value={$activeCard.attrs[attr]} class="bg-bg-input border border-border-default rounded-md p-1.5 text-sm text-text-primary text-center outline-none focus:border-accent">
            {#each dice as d (d)}<option value={d}>{d}</option>{/each}
          </select>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="text-sm font-semibold mb-3 text-text-primary">Képzettségek</h3>
    
    <div class="bg-black/15 border border-dashed border-border-hover rounded-xl p-3 min-h-[60px] flex flex-col gap-2 mb-3">
      {#if $activeCard.skills.length === 0}
        <p class="text-xs text-text-tertiary italic text-center py-2">Adj hozzá elemeket a könyvtárból.</p>
      {/if}
      
      {#each $activeCard.skills as skill (skill.id)}
        <div class="flex items-center gap-3 bg-linear-to-b from-[#34291f] to-[#231c16] border border-[#574432] rounded-lg p-2 shadow-sm">
          <div class="flex-1 min-w-0">
            <span class="font-bold text-[#ffe0a0] text-sm truncate block">{skill.name}</span>
            {#if skill.attr}<span class="text-xs text-text-secondary block">({skill.attr})</span>{/if}
          </div>
          
          <select bind:value={skill.die} class="shrink-0 bg-bg-input border border-border-default rounded-md p-1 text-sm text-text-primary outline-none focus:border-accent w-20">
            {#each dice as d (d)}
              <option value={d}>{d}</option>
            {/each}
          </select>
          
          <button onclick={() => removeItem('skills', skill.id!)} class="shrink-0 w-7 h-7 flex items-center justify-center rounded bg-danger/80 hover:bg-danger text-white transition-colors" title="Törlés">✕</button>
        </div>
      {/each}
    </div>

    <!-- SEAMLESS GROUP -->
    <div class="flex rounded-lg overflow-hidden border border-border-default focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-shadow">
      <input type="text" bind:value={customInputs.skills} onkeydown={(e) => e.key === 'Enter' && addCustomItem('skills')} placeholder="Egyedi képzettség neve" class="min-w-0 flex-1 bg-bg-input p-2 text-sm text-text-primary placeholder-text-tertiary border-none outline-none focus:ring-0" />
      <button onclick={() => addCustomItem('skills')} class="shrink-0 bg-bg-surface hover:text-accent border-l border-border-default text-text-primary px-4 py-2 text-sm font-semibold transition-colors">Hozzáad</button>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 class="text-sm font-semibold mb-3 text-text-primary">Előnyök</h3>
      <div class="bg-black/15 border border-dashed border-border-hover rounded-xl p-3 min-h-[60px] flex flex-col gap-2 mb-3">
        {#if $activeCard.edges.length === 0}
          <p class="text-xs text-text-tertiary italic text-center py-2">Üres.</p>
        {/if}
        {#each $activeCard.edges as edge (edge.id)}
          <div class="flex items-center justify-between bg-linear-to-b from-[#34291f] to-[#231c16] border border-[#574432] rounded-lg p-2 shadow-sm">
            <span class="font-bold text-[#ffe0a0] text-sm truncate pr-2">{edge.name}</span>
            <button onclick={() => removeItem('edges', edge.id!)} class="shrink-0 text-danger hover:text-white text-lg leading-none" title="Törlés">✕</button>
          </div>
        {/each}
      </div>
      <!-- SEAMLESS GROUP -->
      <div class="flex rounded-lg overflow-hidden border border-border-default focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-shadow">
        <input type="text" bind:value={customInputs.edges} onkeydown={(e) => e.key === 'Enter' && addCustomItem('edges')} placeholder="Egyedi előny" class="min-w-0 flex-1 bg-bg-input p-2 text-sm text-text-primary placeholder-text-tertiary border-none outline-none focus:ring-0" />
        <button onclick={() => addCustomItem('edges')} class="shrink-0 bg-bg-surface hover:text-accent border-l border-border-default text-text-primary px-4 py-2 text-sm font-semibold transition-colors">Hozzáad</button>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-semibold mb-3 text-text-primary">Hátrányok</h3>
      <div class="bg-black/15 border border-dashed border-border-hover rounded-xl p-3 min-h-[60px] flex flex-col gap-2 mb-3">
        {#if $activeCard.hindrances.length === 0}
          <p class="text-xs text-text-tertiary italic text-center py-2">Üres.</p>
        {/if}
        {#each $activeCard.hindrances as hind (hind.id)}
          <div class="flex items-center justify-between bg-linear-to-b from-[#34291f] to-[#231c16] border border-[#574432] rounded-lg p-2 shadow-sm">
            <span class="font-bold text-[#ffe0a0] text-sm truncate pr-2">{hind.name}</span>
            <button onclick={() => removeItem('hindrances', hind.id!)} class="shrink-0 text-danger hover:text-white text-lg leading-none" title="Törlés">✕</button>
          </div>
        {/each}
      </div>
      <!-- SEAMLESS GROUP -->
      <div class="flex rounded-lg overflow-hidden border border-border-default focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-shadow">
        <input type="text" bind:value={customInputs.hindrances} onkeydown={(e) => e.key === 'Enter' && addCustomItem('hindrances')} placeholder="Egyedi hátrány" class="min-w-0 flex-1 bg-bg-input p-2 text-sm text-text-primary placeholder-text-tertiary border-none outline-none focus:ring-0" />
        <button onclick={() => addCustomItem('hindrances')} class="shrink-0 bg-bg-surface hover:text-accent border-l border-border-default text-text-primary px-4 py-2 text-sm font-semibold transition-colors">Hozzáad</button>
      </div>
    </div>
  </div>

  <div>
    <h3 class="text-sm font-semibold mb-3 text-text-primary">Szörny képességek <span class="text-xs text-text-tertiary font-normal">— a behúzott elemek leírása itt szerkeszthető</span></h3>
    <div class="bg-black/15 border border-dashed border-border-hover rounded-xl p-3 min-h-[60px] flex flex-col gap-3 mb-3">
      {#if $activeCard.abilities.length === 0}
        <p class="text-xs text-text-tertiary italic text-center py-2">Adj hozzá szörny képességeket a könyvtárból.</p>
      {/if}
      
      {#each $activeCard.abilities as ability (ability.id)}
        <div class="bg-linear-to-b from-[#34291f] to-[#231c16] border border-[#574432] rounded-lg p-3 shadow-sm">
          <div class="flex justify-between items-start mb-2">
            <span class="font-bold text-[#ffe0a0] pr-2 truncate">{ability.name}</span>
            <button onclick={() => removeItem('abilities', ability.id!)} class="shrink-0 text-danger hover:text-white text-lg leading-none" title="Törlés">✕</button>
          </div>
          <div class="bg-bg-input border border-[#80633f] rounded-lg p-2">
            <label for="textarea-{ability.id}" class="block text-[10px] text-accent font-bold mb-1 uppercase tracking-wider">Kártyára kerülő leírás</label>
            <textarea id="textarea-{ability.id}" bind:value={ability.desc} class="w-full bg-[#0f0b08] border border-[#9b7747] rounded-md p-2 text-xs text-text-secondary outline-none focus:border-accent min-h-[60px] custom-scrollbar"></textarea>
          </div>
        </div>
      {/each}
    </div>
    <!-- SEAMLESS GROUP -->
    <div class="flex rounded-lg overflow-hidden border border-border-default focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-shadow">
      <input type="text" bind:value={customInputs.abilities} onkeydown={(e) => e.key === 'Enter' && addCustomItem('abilities')} placeholder="Egyedi képesség" class="min-w-0 flex-1 bg-bg-input p-2 text-sm text-text-primary placeholder-text-tertiary border-none outline-none focus:ring-0" />
      <button onclick={() => addCustomItem('abilities')} class="shrink-0 bg-bg-surface hover:text-accent border-l border-border-default text-text-primary px-4 py-2 text-sm font-semibold transition-colors">Hozzáad</button>
    </div>
  </div>

</div>