import * as React from "react";

import { useEffect } from 'react';

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

    const randomEvent = events[0];

    return (
        <>
            <div className=' w-full h-40 p-4 bg-white'>
                <div className='flex flex-row gap-1 w-full h-full'>

                    <div className='w-8 h-full flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <div className='flex flex-col gap-2'>

                        <div className='flex flex-row justify-between'>

                            <div className='flex flex-col justify-between' >
                                <div className='font-bold'>{randomEvent && randomEvent.away.name}</div>
                                <div className='text-sm text-gray-400 text-left'>MONEYLINE</div>
                            </div>

                            <div className='font-bold'>+250</div>
                        </div>

                        <div className='flex justify-between text-xs'>
                            <div>{randomEvent &&  randomEvent.home.name} v {randomEvent &&  randomEvent.away.name}</div>
                            <div>SAT 3:00PM ET</div>
                        </div>

                        <div className='flex justify-between gap-4'>
                            <input className='w-full border rounded p-2 text-sm' value="$20.00" />
                            <input className='w-full border rounded p-2 text-sm' value="$50.00" />
                        </div>

                    </div>
                </div>
                </div>

            </>



            );
}
