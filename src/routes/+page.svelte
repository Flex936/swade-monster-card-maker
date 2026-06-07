<script>
  import CardEditor from '$lib/components/CardEditor.svelte';
  import CardPreview from '$lib/components/CardPreview.svelte';
  import LibrarySidebar from '$lib/components/LibrarySidebar.svelte';
</script>

<main class="mx-auto grid max-w-[1600px] grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 p-4 print:block print:p-0">
  
  <aside class="bg-bg-surface border border-border-default rounded-2xl p-4 sticky top-24 h-[85vh] flex flex-col print:hidden">
    <h2 class="text-lg font-semibold border-b border-border-default pb-2 mb-4 text-text-primary shrink-0">Könyvtár</h2>
    <LibrarySidebar />
  </aside>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start print:block">
    
    <section class="bg-bg-surface border border-border-default rounded-2xl p-4 print:hidden">
      <h2 class="text-lg font-semibold border-b border-border-default pb-2 mb-4 bg-black/20 -mx-4 px-4 -mt-4 pt-4 text-text-primary">Szerkesztő</h2>
      <CardEditor />
    </section>

    <section class="bg-bg-surface border border-border-default rounded-2xl p-4 sticky top-24 print:border-0 print:bg-transparent print:p-0">
      <h2 class="text-lg font-semibold border-b border-border-default pb-2 mb-4 bg-black/20 -mx-4 px-4 -mt-4 pt-4 print:hidden text-text-primary">Nyomtatható kártya</h2>
      <CardPreview />
    </section>

  </div>
</main>