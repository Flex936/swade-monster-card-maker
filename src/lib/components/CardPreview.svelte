<script>
  import { activeCard, derivedStats } from '$lib/stores/cardStore';
</script>

<div class="bg-[#f8f0df] text-[#1b1209] rounded-xl p-6 border-4 border-double border-[#6f4e25] shadow-xl max-w-xl mx-auto print:shadow-none print:border-2">
  <h3 class="text-2xl font-serif font-bold text-center">{$activeCard.name || 'Névtelen szörny'}</h3>
  <p class="text-center text-xs text-[#5e4d39] italic mb-4">{$activeCard.type || 'SWADE ellenfél'}</p>
  
  <div class="grid grid-cols-4 gap-2 text-center text-xs mb-4">
    <div class="p-1.5 bg-[#fff9ed] border-2 border-[#6f4e25] rounded-md">
      <span class="block text-xl font-bold">{$derivedStats.pace}</span> Iram
    </div>
    <div class="p-1.5 bg-[#fff9ed] border-2 border-[#6f4e25] rounded-md">
      <span class="block text-xl font-bold">{$activeCard.runDie}</span> Futás
    </div>
    <div class="p-1.5 bg-[#fff9ed] border-2 border-[#6f4e25] rounded-md">
      <span class="block text-xl font-bold">{$derivedStats.parry}</span> Hárítás
    </div>
    <div class="p-1.5 bg-[#fff9ed] border-2 border-[#6f4e25] rounded-md">
      <span class="block text-xl font-bold">
        {$derivedStats.tough} {$activeCard.armor > 0 ? `(${$activeCard.armor})` : ''}
      </span> 
      Szívósság
    </div>
  </div>

  </div>