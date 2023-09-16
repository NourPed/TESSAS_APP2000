/*
 * CalendarComponent.js
 *
 * Denne komponenten er kalenderen som gjengis på B_Bestillinger.
 * Den behandler klikk i kalender for å sette en start- og sluttdato
 * på bookingen.
 * 
 * Lagd av 6004
 */

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarBox({ dateRange, setDateRange }) {
    /*
     * Handler for når datovalget endres i kalenderen
     * react-calendar håndterer tydeligvis datoområder selv når man setter 'selectRange'
     * til true; dvs. at når onChange blir kalt, får den inn et array med to datoer
     * (start og slutt) og lagrer det i dateRange
     * https://www.npmjs.com/package/react-calendar
     */
    const calendarHandler = (dateRange) => {
        setDateRange(dateRange);
    };

    return (
        <div>
            <Calendar
                value={dateRange}
                onChange={calendarHandler}
                selectRange={true}
                tileClassName={({ date, view }) => {
                    // Funksjon for å dynamisk sette CSS for datoene i kalenderen ('select-date')
                    if (view === "month") {
                        // Returnerer datoene så lenge de ikke er null (bruker har trykket)
                        if (dateRange[0] && dateRange[1] && date >= dateRange[0] && date <= dateRange[1]) {
                            return 'selected-date';
                        }
                        // Dersom kun startdato er valgt og den er det eneste valgte, settes det
                        // automatisk til sluttdato
                        else if (dateRange[0] && date.getTime() === dateRange[0].getTime()) {
                            return 'selected-date';
                        }
                    }
                }}
                minDate={new Date()} // minste tillatte dato
            />
        </div>
    );
};

export default CalendarBox;
