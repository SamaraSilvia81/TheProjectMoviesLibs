# Movies Libs 

- O botão é condicionado pela propriedade showLink

```jsx
 
{showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}

```

- Quando fazemos um loop no react colocamos a propriedade key para ele se achar mais rápido

```jsx
 
{topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}

```
