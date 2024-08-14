import React from "react";
import { Group } from "../../../types";

import PeopleDiv from "../PeopleDiv/PeopleDiv";

const SittandeSection: React.FC<{group: Group}> = ({group}) => {    
    return (
        <section id="sittandeSection">
            <h2>Sittande</h2>
            <div id="patetos">
                <PeopleDiv group={group} />
            </div>
        </section>
    )
}

export default SittandeSection;