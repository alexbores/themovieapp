<template>
  <PageLoader :loading="loading" />
  <section>
      <MovieList :movies="movies" @remove="removeMovie" @add="addMovie" @update="updateMovie" />
  </section>
</template>

<script>
import { ref } from 'vue';
import { getMovies, getMovie } from './services';
import MovieList from './components/MovieList.vue';
import PageLoader from './components/PageLoader.vue';

export default {
  components: {
    MovieList,
    PageLoader,
  },
  setup() {
    const movies = ref([]);
    const loading = ref();

    const fetchMovies = async () => {
      setLoading(true);
      movies.value = await getMovies();
      if(movies.value){
        setLoading(false);
      }
    };

    const removeMovie = (index) => {
      movies.value.splice(index, 1);
    };

    const addMovie = async () => {
      setLoading(true);
      const nextMovie = await getMovie(movies.value);
      if (nextMovie) {
        movies.value.push(nextMovie);
        setLoading(false);
      }
    };

    const updateMovie = ({ index, movie }) => {
      movies.value.splice(index, 1, movie);
    };
    
    const setLoading = (val) => {
      window.setTimeout(()=>{
        loading.value = val;
      }, (val === false)?500:1);
    }

    

    fetchMovies();

    return { movies, removeMovie, addMovie, updateMovie, loading };
  },
};
</script>

<style>


:root{
  --color1: #eaeae2;
  --color2: #dd4f3e;
  --color3: #2e3034;
  --colorError: #be1b1b;
  --colorOk: #00A86B;

  --mainBorder: 3px;
}

/*reset*/
*, ::after, ::before{
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;

  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-align: left;
  font: inherit;
  font-size: 100%; 
  font-family: sans-serif;
  outline: none;
  -webkit-text-size-adjust: 100%;
  line-height: 1.4;

  box-sizing: border-box;

  user-select: none;
  
  -webkit-touch-callout: none;  

  word-break: break-word;
}
body {
    line-height: 1;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav{
  display: block;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
span,strong,a,option{
  font-size: inherit;
  color: inherit;
}
a,a:hover{
  text-decoration: none; 
}
a:focus{
  color: none;
}

/*inputs*/
.input:focus::-webkit-input-placeholder{
  color: transparent;
}
.input:focus:-moz-placeholder{
  color: transparent;
}
.input:focus::-moz-placeholder{
  color: transparent;
}
.input:focus:-ms-input-placeholder {
  color: transparent;
}
.input:focus{
  outline: none
}
.input,
.button{
  -webkit-appearance: none;
  -o-text-overflow: clip;
  text-overflow: clip;
  min-height: var(--inputHeight);
  padding-left: 10px;
  padding-right: 10px;
  background-color: white;
  width: 100%;
  color: var(--inputTextColor,black);
}
.input{
  user-select: text;
  -o-user-select: text;
  -ms-user-select: text;
  -moz-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  -webkit-touch-callout: text;
}
textarea.input{
  resize: none;
}
.input[type=checkbox], 
.input[type=radio] {
  height: 15px;
  width: 15px;
  min-height: 15px;
  background: #fff;
  cursor: pointer;
  display:inline-block;
  padding: 0;
}
.input[type=checkbox]:checked{
  background: var(--colorOk);
}
::-webkit-credentials-auto-fill-button {
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
}
:-moz-placeholder{ 
   color: inherit;
   font-size: inherit;
   font: inherit;
   opacity: 1;
}
:-ms-input-placeholder{ 
   color: inherit;
   font-size: inherit;
   font: inherit;
   opacity: 1;
}
::-moz-placeholder{ 
   color: inherit;
   font-size: inherit;
   font: inherit;
   opacity: 1;
}
::-webkit-input-placeholder{ 
   color: inherit;
   font-size: inherit;
   font: inherit;
   opacity: 1;
}
.button{
  border: unset;
  cursor: pointer;

  transition: all .2s;
  
  display: flex;

  justify-content: center;
  align-items: center;

  opacity: 1;
  text-align: center;
}
.button > *{
  text-align: center;
  transition: all .2s;
}
.button:disabled[disabled]{
  color: black;
  opacity: 1;
  background-color: gray;
  cursor: not-allowed;
}

img {
  display: inline-block;
  vertical-align: bottom;
  object-fit: contain;
}

/*main setup*/
::-webkit-scrollbar {
    width: 10px;
    max-width: 10px;
}
::-webkit-scrollbar-track{
    background: #f1f1f1; 
}
::-webkit-scrollbar-thumb {
    background: #888; 
}
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

div, 
section, 
main, 
html{
  width: auto;
  height: auto;
}
html,
body{
  position: relative;
  width: 100%;
  scroll-behavior: smooth;
  min-width: 320px;
  min-height: 100vh;
}
body{
  background-color: var(--color1);
}


section{
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
}
.content{
  max-width: 1300px;
  width: 100%;
}


h1{
  font-size: 35px;
  color: var(--color3);
  font-weight: bold;
}
h2{
  font-size: 20px;
  color: var(--color3);
  font-weight: bold;
}
p{
  font-size: 16px;
  color: var(--color3);
}

.button{
  border-radius: var(--mainBorder);
  border: 2px solid black;
  background-color: rgba(0,0,0,0);
  color: black;
  transition: all 0.2s;
  min-height: 50px;
}
.button:hover{
  background-color: black;
  color: white;
}
.button.error{
  border: 2px solid var(--colorError);
  color: var(--colorError);
}
.button.error:hover{
  background-color: var(--colorError);
  color: white;
}
.button.error svg{
  width: 20px;
  height: 20px;
  fill: var(--colorError);
  transition: all 0.5s;
}
.button.error:hover svg{
  fill: white;
}
.button.ok{
  border: 2px solid var(--colorOk);
  color: var(--colorOk);
}
.button.ok:hover{
  background-color: var(--colorOk);
  color: white;
}

</style>