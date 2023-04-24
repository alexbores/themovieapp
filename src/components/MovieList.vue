<template>
  <div class="content">
    <div class="titleHolder">
      <h1>Popular Movies</h1>
      <p>Movie Count: <span>{{movies?.length}}</span></p>
    </div>
    <div class="moviesHolder">
      <div class="movie" v-for="(movie, index) in movies" :key="movie.id">
        <div class="poster">
          <img :src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" :alt="movie.title">
        </div>
        <h2 v-if="editingIndex !== index">{{ movie.title }}</h2>
        <textarea class="input" v-if="editingIndex === index" v-model="editedTitle"></textarea>
        <p class="date">{{movie.release_date}}</p>
        
        
        <div class="buttonsHolder">
          <button class="button" v-if="editingIndex !== index" @click="editMovie(index)">Edit</button>
          <button class="button ok" v-if="editingIndex === index" @click="saveMovie(index)">Save</button>
          <button class="button error" @click="$emit('remove', index)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M20 5h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H4a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h1a1 1 0 1 0 0-2zM8 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1H8V4zm8 14H8V7h8v11z"/>
              <rect data-v-5ea49cee="" x="11" y="7" width="2" height="11"></rect>
            </svg>
         </button>
        </div>
      </div>

      <div class="movie add" >
        <div class="poster" @click="addMovie">
          <!-- <img :src="'https://image.tmdb.org/t/p/w500/'+movies[0]?.poster_path"> -->
          <p>+</p>
        </div>
        <p >Add Movie</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  components: {
  },
  props: {
    movies: Array,
  },
  setup(props, { emit }) {
    const editingIndex = ref(-1);
    const editedTitle = ref('');

    const editMovie = (index) => {
      editingIndex.value = index;
      editedTitle.value = props.movies[index].title; // Set the editedTitle value to the original movie title
    };

    const saveMovie = (index) => {
      const editedMovie = { ...props.movies[index], title: editedTitle.value };
      emit("update", { index, movie: editedMovie });
      editingIndex.value = -1;
      editedTitle.value = ''; // Reset the editedTitle value after saving
    };

    const cancelEdit = () => {
      editingIndex.value = -1;
    };

    const removeMovie = (index) => {
      emit('remove', index);
    };

    const addMovie = () => {
      emit('add');
    };

    return {
      editingIndex,
      editMovie,
      editedTitle,
      saveMovie,
      cancelEdit,
      removeMovie,
      addMovie,
    };
  },
};
</script>





<style scoped>
.content{
  padding-bottom: 40px;
  padding-top: 40px;
  --margin: 20px;
}
.titleHolder{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: var(--margin);
  padding-right: var(--margin);
}
.titleHolder h1{
  text-transform: uppercase;
  color: var(--color2);
}
.titleHolder p{
  font-weight: bold;
  text-transform: uppercase;
}
.titleHolder p span{
  font-size: 25px;
  color: var(--color2);
}
.titleHolder .addBtn{
  max-width: 200px;
}
.moviesHolder{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}


.movie{
  border-radius: var(--mainBorder);
  margin: 30px var(--margin);
  width: calc(25% - var(--margin) * 2);
  position: relative;
  padding-bottom: 60px;
  cursor: pointer;
}
.movie h2{
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.movie .date{
  color: var(--color2);
}
.movie .input{
  min-height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.movie .poster{
  box-shadow: 0px 0px 11px 4px rgba(0,0,0,0.25);
  position: relative;
  padding-bottom: 149.25%;
  border-radius: var(--mainBorder);
  overflow: hidden;
}
.movie .poster:after{
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.1s;
  border: 0px solid var(--color1);
  position: absolute;
  z-index: 2;
}
.movie:hover .poster:after{
  border: 5px solid var(--color2);
}
.movie img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: var(--mainBorder);
  position: absolute;
}
.movie .buttonsHolder{
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-top: auto;
}
.movie .buttonsHolder .button.error{
  width: 50px;
}
.movie .buttonsHolder .button{
  width: calc(100% - 50px);
}


.movie.add .poster{
  box-shadow: unset;
}
.movie.add .poster:after{
  border: 5px solid var(--color3);
}
.movie.add:hover .poster:after{
  border: 5px solid var(--colorOk);
}
.movie.add .poster p{
  font-size: 50px;
  font-weight: bold;
  color: var(--color3);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:auto;
  height: 50px;
  width: 50px;
  text-align: center;
  z-index: 2;
  transition: all 0.5s;
}
.movie.add:hover .poster p{
  color: var(--colorOk);
}
.movie.add p{
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
}
.movie.add:hover p{
  color: var(--colorOk);
}


@media screen and (max-width: 750px){
  .content{
    --margin: 10px;
  }
}
@media screen and (max-width: 600px){
  .content{
    --margin: 10px;
  }
  .movie{
    margin: 20px var(--margin);
    width: calc(33.33% - var(--margin) * 2);
  }
}
@media screen and (max-width: 530px){
  .titleHolder h1{
    font-size: 25px;
  }
  .titleHolder p span{
    font-size: 25px;
    color: var(--color2);
  }
}
@media screen and (max-width: 470px){
  .titleHolder{
    flex-direction: column;
  }
  .titleHolder p span{
    font-size: 20px;
  }
  .movie{
    margin: 20px var(--margin);
    width: calc(50% - var(--margin) * 2);
  }
}

</style>