<template>
  <section class="flex flex-row flex-wrap justify-between items-center w-4/5 gap-10">
    <div class="flex flex-row justify-between items-center w-full">
      <button @click="previousPage" :disabled="currentPage === 1" class="inline-block px-4 py-2 text-white w-max bg-transparent">← Previous</button>
      <div class="text-white"><b>{{ currentPage }} / {{ totalPages }}</b></div>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="inline-block px-4 py-2 text-white w-max bg-transparent">Next →</button>
    </div>
    <Card v-for="character in characters" :key="character.id" 
      :name="character.name" 
      :image_src="character.image" 
      :link="character.id" 
      :species="character.species" 
      :status="character.status" 
      :gender="character.gender" 
      :location="character.location.name"
      :id="character.id"
    />
  </section>
</template>

<script>
import Card from "../organisms/Card.vue";
import { getAllCharacters } from "../../data/data";

export default {
  name: "CardsContainer",
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: null,
    };
  },
  async mounted() {
    await this.updateData();
  },
  methods: {
    async updateData(page = 1) {
      const data = await getAllCharacters({ page });
      this.characters = data.results;
      this.totalPages = data.info.pages;
      this.currentPage = page;
    },
    async previousPage() {
      await this.updateData(this.currentPage - 1);
    },
    async nextPage() {
      await this.updateData(this.currentPage + 1);
    },
  },
  components: { Card },
};
</script>
