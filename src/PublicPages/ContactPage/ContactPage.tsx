import './ContactPage.css'


const ContactPage = () => {
    return (
        <div className='contactPage'>
            <h1>Kontakta FikIT</h1>

            <ul className='noUlFormatting'>
                <li>
                    <a className="noAFormatting" href="mailto:fikit@chalmers.it">
                        <img src="images/icons/email.svg" alt="email" />
                        <p className='hoverUnderSlide'>fikit@chalmers.it</p>
                    </a>
                </li>

                <li>
                    <a className="noAFormatting" href="https://www.instagram.com/fikit_chalmers">
                        <img src="images/logos/instagram.png" alt="Instagram" height={20} />
                        <p className='hoverUnderSlide'>fikit_chalmers</p>
                    </a>
                </li>

                <li>
                    <a className="noAFormatting" href="https://cthit.slack.com/archives/C7H5UP58A">
                        <img src="images/logos/slack.png" alt="Slack" height={20} />
                        <p className='hoverUnderSlide'>#fikit</p>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default ContactPage