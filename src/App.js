import React, { useState } from 'react';

const api = {
    key: 'e4416008319d44c3fb2240b8a3fe8964',
    base: 'https://api.openweathermap.org/data/2.5/',
};

const App = () => {
    const date = new Date();

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = (event) => {
        event.preventDefault();

        try {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery('');
                });
        } catch (err) {
            console.error(err);
        }
    };

    const getDate = (date) => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Agust',
            'September',
            'October',
            'November',
            'December',
        ];

        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        let d = date.getDate();
        let day = days[date.getDay()];
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        return `${day}, ${d} ${month} ${year}`;
    };

    return (
        <div
            className={
                weather.main !== undefined && weather.main.temp > 16
                    ? 'App warm'
                    : 'App'
            }
        >
            <div className="search-bar">
                <form onSubmit={search}>
                    <input
                        value={query}
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </form>
            </div>
            {typeof weather.main != 'undefined' ? (
                <div className="weather-container">
                    <div className="information">
                        <div className="local">
                            {weather.name}, {weather.sys.country}
                        </div>
                        <div className="date">{getDate(date)}</div>
                    </div>

                    <div className="weather-box">
                        <div className="temp-container">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                        </div>
                        <div className="weather">{weather.weather[0].main}</div>
                    </div>
                </div>
            ) : (
                <div className="undefined-local"></div>
            )}
        </div>
    );
};

export default App;
