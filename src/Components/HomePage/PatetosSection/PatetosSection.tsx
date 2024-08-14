import React from "react";
// import './PatetosSection.css'
import { Group } from "../../../types";

import PeopleDiv from "../PeopleDiv/PeopleDiv";

const PatetosSection: React.FC<{groups: Group[]}> = ({groups}) => {    
    return (
        <section id="patetosSection">
            <h2>Groups</h2>
            <div id="patetos">
                {groups.map((group: Group, index: number) => (
                    <PeopleDiv key={index} group={group} />
                ))}
            </div>
        </section>
    )
}

export default PatetosSection;