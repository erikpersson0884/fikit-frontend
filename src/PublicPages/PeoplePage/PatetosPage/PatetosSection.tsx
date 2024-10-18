import React from "react";
// import './PatetosSection.css'
import { Group } from "../../../types";

import PeopleDiv from "../PeopleDiv/PeopleDiv";

const PatetosSection: React.FC<{groups: Group[]}> = ({groups}) => {    
    return (
        <article id="patetosSection">
            <h2>Pateter</h2>

            <section id="patetos">
                {groups.map((group: Group, index: number) => (
                    <PeopleDiv key={index} group={group} />
                ))}
            </section>
        </article>
    )
}

export default PatetosSection;