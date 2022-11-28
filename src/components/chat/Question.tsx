function Question(props:any) {
    switch(props.question) {
        // Password ================================================================================= 
        case 'How can I reset my password?':
          return (
            <div>Answer: 
                <ul>
                    <li>If the password is known 
                        <a href="https://intern.fontys.nl/wwselfservice/ChangePassword.aspx">Wijzigen wachtwoord (fontys.nl)</a></li>
                    <li>If the password is not know - call via WhatsApp to ServiceDesk IT / visit student desk of your education.</li>
                </ul>
            </div>
          );
        
        // Office 365 =================================================================================
        case 'What included in Office 365?':
            return (
                <div>Answer: <br/>The Office version we provide contains Word, Excel, Powerpoint, (ask office members in Team Flip).</div>
            );
        case 'Can I get Office 365?':
            return (
                <div>Answer: <br/>On portal.office.com you can, you may install it on 5 separate devices.</div>
            );
        case 'Can I add an email account?':
            return (
                <div>Answer: <br/>Only email accounts which support Exchange (no pop3 or imap).</div>
            );
        case 'How to enable presentation mode (PowerPoint)?':
            return (
                <div>Answer: <br/>To use powerpoint in presenter mode click on ...</div>
            );
        case 'Other Office 365 questions.':
            return (
                <div>Answer: <br/>Visit <a href="https://connect.fontys.nl/diensten/IT/Paginas/Office-365.aspx#english">Office 365 (fontys.nl)</a></div>
            );

        // Equipment =================================================================================
        case 'I have direct access problems in the start up of the laptop.':
            return (
                <div>Answer: <br/>No answer.</div>
            );
        case 'I have Battery, Sound, Camera issues.':
            return (
                <div>Answer: <br/>Please visit a IT team on your campus/building to check your computer.</div>
            );

        // WiFi =================================================================================    
        case 'How to connect to eduroam (students)?':
            return (
                <div>Answer: <br/>See Website <a href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/verbindenmeteduroam.aspx">Handleiding Verbinden met Eduroam (fontys.nl) (Dutch)</a></div>
            );
        case 'How to connect to eduroam as a visitor (guest lecturer)?':
            return (
                <div>Answer: <br/>No answer.</div>
            );

        // Audio & Video =================================================================================    
        case 'How to use the smart board?':
            return (
                <div>Answer: <br/>See Website <a target="_blank" href="https://connect.fontys.nl/diensten/IT/handleidingen/Paginas/Audio_visuele_middelen.aspx">Pagina's - Over Audio visuele middelen (fontys.nl) (Dutch)</a></div>
            );
        default:
          return(null);
      }
}

export default Question;