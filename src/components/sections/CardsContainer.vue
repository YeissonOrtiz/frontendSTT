<template>
  <section class="flex flex-row flex-wrap justify-between items-center w-4/5 gap-10">
    <SliderPages
      :currentPage="currentPage"
      :totalPages="totalPages"
      :disablePrevious="currentPage === 1"
      :disableNext="currentPage === totalPages"
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
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
import { getAllCharacters } from "../../data/apiRickAndMorty";
import SliderPages from "../molecules/SliderPages.vue";

export default {
  name: "CardsContainer",
  components: { Card, SliderPages },
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
      await this.updateData(--this.currentPage);
    },
    async nextPage() {
      await this.updateData(++this.currentPage);
    },
  },
};
</script>
