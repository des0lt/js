/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          formInput = addForm.querySelector('.adding__input'),
          favCheckbox = addForm.querySelector('[type="checkbox"]');
    
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        let newFilm = formInput.value;
        const favorite = favCheckbox.checked;
    
        if (newFilm) {
    
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
    
            if (favorite) {
                console.log('Добавлен новый фильм ');
            }
    
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
        
            createMovieList(movieDB.movies, movieList);
        }
    
        event.target.reset();
    });
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }
    
    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }
    
    const sortArr = (arr) => {
        arr.sort();
    }
    
    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                
                createMovieList(films, parent);
            })
        });
    }
    
    
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});

// formBtn.addEventListener("click", pushInput);

// function pushInput() {
//     let inputValue = formInput.value;
//     if (favMovieInput.checked) {
//         console.log(1)
//     } else {
//         console.log(2)
//     }
//     // console.log(favMovie);
//     function checkLength(str) {
//         if (str.length > 21) {
//             str = str.slice(0, 18) + "...";
//         }
//         return str;
//     }
//     movieDB.movies.push(inputValue);

//     // if (inputValue.length > 21) {
//     //     inputValue = inputValue.slice(0, 18) + "...";
//     //     console.log(1)
//     // }
//     // console.log(2)
//     function retypeArr() {
//         movieList.innerHTML = "";
//         movieDB.movies.sort();
//         movieDB.movies.forEach((film, i) => {
//             movieList.innerHTML += `
//                 <li class="promo__interactive-item">${i + 1}  ${checkLength(film)}
//                     <div class="delete"></div>
//                 </li>
//             `;
//         });
//     }
//     retypeArr();
// }
