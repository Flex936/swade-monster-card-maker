<script lang="ts">
  import { swadeDefaults } from '$lib/data/swadeDefaults';
  import { activeCard } from '$lib/stores/cardStore';

  let activeTab = $state('skills');
  let searchQuery = $state('');

  const tabs = [
    { id: 'skills', label: 'Képzettségek' },
    { id: 'abilities', label: 'Képességek' },
    { id: 'powers', label: 'Erők' },
    { id: 'edges', label: 'Előnyök' },
    { id: 'hindrances', label: 'Hátrányok' }
  ];

  let filteredItems = $derived.by(() => {
    // @ts-expect-error - smth
    const items = swadeDefaults[activeTab] || [];
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return items;

    return items.filter((item: any) => 
      item.name.toLowerCase().includes(query) || 
      (item.desc && item.desc.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

  function isItemAdded(itemName: string) {
    const tabKey = activeTab as 'skills' | 'abilities' | 'powers' | 'edges' | 'hindrances';
    return $activeCard[tabKey].some((i) => i.name === itemName);
  }

  function toggleItem(item: any) {
    const tabKey = activeTab as 'skills' | 'abilities' | 'powers' | 'edges' | 'hindrances';
    
    if (isItemAdded(item.name)) {
      // @ts-expect-error- smth
      $activeCard[tabKey] = $activeCard[tabKey].filter(i => i.name !== item.name);
    } else {
      const generateId = () => Math.random().toString(36).slice(2, 10);
      const newItem: any = {
        id: generateId(),
        name: item.name,
        desc: item.desc || '',
        category: item.category || '',
        attr: item.attr || ''
      };
      
      if (tabKey === 'skills') {
        newItem.die = 'd6';
      }
      
      $activeCard[tabKey] = [...$activeCard[tabKey], newItem];
    }
  }
</script>

<div class="flex flex-col gap-4 flex-1 min-h-0">
  
  <div class="flex flex-wrap gap-2 border-b border-border-default pb-3 shrink-0">
    {#each tabs as tab (tab.id)}
      <button 
        type="button"
        onclick={() => activeTab = tab.id}
        class="px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors
               {activeTab === tab.id 
                  ? 'bg-accent text-bg-input border-accent' 
                  : 'bg-bg-input text-text-secondary border-border-default hover:border-accent hover:text-text-primary'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <div class="shrink-0">
    <input 
      type="text" 
      bind:value={searchQuery} 
      placeholder="Keresés névben, leírásban..." 
      class="w-full bg-bg-input border border-border-default rounded-lg p-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent focus:ring-1 focus:ring-accent outline-none shadow-inner transition-shadow"
    />
  </div>

  <div class="flex-1 overflow-y-auto pr-2 space-y-2 pb-2 custom-scrollbar min-h-0">
    {#if filteredItems.length === 0}
      <div class="text-text-tertiary text-sm italic text-center p-4 border border-dashed border-border-default rounded-lg">
        Nincs találat.
      </div>
    {:else}
      {#each filteredItems as item (item.name)}
        <div class="bg-linear-to-b from-bg-surface to-bg-base border border-border-default rounded-xl p-3 shadow-md hover:border-accent transition-colors group">
          
          <div class="flex justify-between items-start gap-2 mb-1">
            <div class="font-bold text-accent group-hover:text-text-primary transition-colors">
              {item.name}
            </div>
            
            {#if isItemAdded(item.name)}
              <button 
                onclick={() => toggleItem(item)}
                class="shrink-0 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-danger text-text-primary font-bold shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Törlés
              </button>
            {:else}
              <button 
                onclick={() => toggleItem(item)}
                class="shrink-0 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-success text-text-primary font-bold shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Hozzáad
              </button>
            {/if}
          </div>
          
          <div class="text-xs text-text-secondary leading-relaxed line-clamp-3">
            {item.desc}
          </div>
          
          {#if item.attr || item.category}
            <div class="mt-2 inline-block border border-border-default rounded-full px-2 py-0.5 text-[10px] text-accent bg-bg-input uppercase tracking-wider font-semibold">
              {item.attr || item.category}
            </div>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</div>