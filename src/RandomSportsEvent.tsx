import * as React from "react";

function getSport(sport, apiKey) {
    return fetch(`https://sports-api.cloudbet.com/pub/v2/odds/sports/${sport}`, {
        headers: {
            "X-Api-Key": apiKey,
            "cache-control": "max-age=600"
        }
    });
}

function getCompetition(competition, apiKey) {
    return fetch(
        `https://sports-api.cloudbet.com/pub/v2/odds/competitions/${competition}`,
        {
            headers: {
                "X-Api-Key": apiKey,
                "cache-control": "max-age=600"
            }
        }
    );
}

const randomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomSportsEvent({ sport = "soccer", apiKey = null, useStore = null }) {

    const [competitions, setCompetitions] = React.useState([]);
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        if (!apiKey) {
            return;
        }
        getSport(sport, apiKey).then((response) => {
            return response.json();
        })
            .then((body) => {
                setCompetitions(body.categories
                    .flatMap((c) => c.competitions));
            });

    }, [apiKey]);


    React.useEffect(() => {

        if (!competitions.length) {
            return;
        }

        getCompetition(randomElement(competitions).key, apiKey).then((response) => {
            return response.json();
        })
            .then((body) => {
                setEvents(body.events)
            });

    }, [competitions])

    console.log(events[0]);

    return (
        <div>
            {events[0] ? events[0].name : "Loading"}
        </div>
    );
}
