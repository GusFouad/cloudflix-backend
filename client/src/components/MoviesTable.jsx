import React, { Component } from "react";
import _ from "lodash";
class MoviesTable extends Component {
  columns = [
    {
      path: "image",
      lable: "Poster",
      content: (movie) => (
        console.log("CONTENT", movie),
        (<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />)
      ),
    },
    { path: "title", lable: "Title" },
    {
      path: "plot",
      lable: "Plot",
      content: (movie) => (
        console.log("PLOT", movie, movie.overview), (<p>{movie.overview}</p>)
      ),
    },
    {
      path: "rating",
      lable: "Rating",
      content: (movie) => (
        console.log("Rating", movie, movie.vote_average),
        (<p>{movie.vote_average}</p>)
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);
    if (column.content && column.path === "poster")
      return column.content(movie);

    return _.get(movie, column.path);
  };
  render() {
    const { movies } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            {this.columns.map((column) => {
              return <th key={column.path || column.key}> {column.lable} </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id || movie.key}>
              {this.columns.map((column) => (
                <td key={column.key || column.path}>
                  {this.renderCell(movie, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
