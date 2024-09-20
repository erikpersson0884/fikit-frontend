import './Joinpage.css';


const JoinPage = () => {
    return (
        <article className='joinpage'>
            <h1>Vill du bli medlem i FikIT?</h1>

            <section>
                <h2>Fördelar med att bli medlem</h2>
                <ul>
                    <li>Du får en kaka</li>
                    <li>Du får ta del av vårt nyhetsbrev</li>
                    <li>Du får rätt att delta på årsmötet</li>
                </ul>
            </section>

            <section>
                <h2>Hur blir jag medlem?</h2>
                <p>
                    För att bli medlem skickar man in en “fin” teckning till föreningens styrelse, där man begär att få bli medlem.
                <br />
                <br />
                    Ansökan lämnas lättast in via styrelsens mail-adress: <a href="mailto: fikit@chalmers.it">fikit@chalmers.it</a>
                </p>
            </section>
        </article>
    );
};

export default JoinPage;