<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import { page } from '$app/state';
    import { resolve } from '$app/paths'

    let { children } = $props();

    // We calculate which tab is active (0, 1, or 2) to move the slider
    let activeIndex = $derived(
        page.url.pathname === '/' ? 0 : 
        page.url.pathname === '/frameworks' ? 1 : 
        2
    );
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-accent selection:text-bg-base">
  
  <header class="sticky top-0 z-50 bg-[#140f0b]/95 backdrop-blur-md pt-4 print:hidden shadow-lg border-b border-border-default">
    
    <!-- Title -->
    <div class="px-6 pb-4 flex justify-center sm:justify-start">
        <h1 class="text-xl font-black tracking-widest text-text-primary uppercase drop-shadow-md">
            SWADE <span class="text-accent">Szörnykártya</span> Készítő
        </h1>
    </div>

    <!-- The Sliding Tab Navigation -->
    <nav class="relative flex w-full max-w-3xl">
      
      <a 
        href={resolve("/")}
        class="flex-1 py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors hover:text-text-primary {activeIndex === 0 ? 'text-accent' : 'text-text-tertiary'}"
      >
        Kártya Szerkesztése
      </a>
      
      <a 
        href={resolve("/frameworks")}
        class="flex-1 py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors hover:text-text-primary {activeIndex === 1 ? 'text-accent' : 'text-text-tertiary'}"
      >
        Keretvilág Szerkesztése
      </a>
      
      <a 
        href={resolve("/help")}
        class="flex-1 py-3 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors hover:text-text-primary {activeIndex === 2 ? 'text-accent' : 'text-text-tertiary'}"
      >
        Súgó
      </a>

      <!-- The Sliding Bottom Indicator -->
      <div 
        class="absolute bottom-px left-0 h-[3px] bg-accent transition-transform duration-300 ease-out"
        style="width: 33.333%; transform: translateX(calc({activeIndex} * 100%));"
      ></div>
    </nav>
  </header>

  {@render children()}
</div>