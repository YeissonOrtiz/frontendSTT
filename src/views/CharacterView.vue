<script>
import Heading from '../components/atoms/Heading.vue';
import Paragraph from '../components/atoms/Paragraph.vue';
import Image from '../components/atoms/Image.vue';
import { getOneCharacter } from '../data/data'
import { handleSubmit } from '../API/index'

export default {
  name: "CharacterView",
  data() {
    return {
      character: {},
      visibleComments: false,
      data: {
        "comment": "",
        "comment_owner": "",
        "character_id": Number(this.$route.params.id)
      },
    }
  },
  async mounted() {
    await this.characterData();
  },
  methods: {
    async characterData() {
      const id = this.$route.params.id;
      const data = await getOneCharacter(id)
      this.character = data;
    },
    toggleVisibleComments() {
      this.visibleComments = !this.visibleComments
    },
    async saveComment(){
      const response = await handleSubmit(this.data)
      return response
    }

  },
  components: {
    Heading,
    Paragraph,
    Image
  }
}
</script>

<template>
  <section class="flex flex-col justify-center items-center">
    <div class="flex flex-col md:flex-row w-4/5 mx-auto justify-center md:items-start px-5 lg:px-20 gap-5 py-10">
      <Image :src="character.image" class="rounded-xl"></Image>
      <div class="info-character flex flex-col gap-5">
        <Heading class="text-white font-bold text-3xl w-full text-left">{{ character.name }}</Heading>
        <div class="characteristics flex flex-row flex-wrap w-full gap-2">
          <Paragraph class="text-white text-xl w-full lg:w-2/5"><b>Species:</b> {{ character.species }}</Paragraph>
          <Paragraph class="text-white text-xl w-full lg:w-2/5"><b>Gender:</b> {{ character.gender }}</Paragraph>
          <Paragraph class="text-white text-xl w-full lg:w-2/5"><b>Status:</b> {{ character.status }}</Paragraph>
          <Paragraph class="text-white text-xl w-full lg:w-2/5" v-if="character.location"><b>Location:</b> {{ character.location.name }}</Paragraph>
        </div>
      </div>
    </div>
    <div class="flex flex-col px-5 lg:px-20 md:flex-row-reverse justify-center md:justify-between xl:justify-start w-full lg:w-4/5 gap-5">
      <div class="w-4/5 lg:w-2/5 mx-auto">
        <h2 class="text-2xl text-white md:text-center">Comments</h2>
        <form @submit.prevent="saveComment" class="flex flex-col gap-5 ">
          <label>
            Usuario:
            <input type="text" v-model="data.comment_owner" />
          </label>
          <label>
            Comentario:
            <input type="text" v-model="data.comment"/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="w-4/5 lg:w-2/5 mx-auto">
        <h3 class="text-white text-2xl hover:cursor-pointer border-b-2 mb-2 pb-2" @click="toggleVisibleComments">{{ visibleComments ? 'Ocultar episodios' : 'Mostrar episodios' }}</h3>
        <ol v-for="episode in character.episode" :class="{'hidden': !visibleComments}">
          <li class="text-white text-xl text-left"><b>Episodio: </b>{{ episode.split("/").pop() }}</li>
        </ol>
      </div>
    </div>
  </section>
</template>
