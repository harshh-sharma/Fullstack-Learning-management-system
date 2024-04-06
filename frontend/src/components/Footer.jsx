import {BsFacebook,BsInstagram,BsLinkedin} from "react-icons/bs";
const currentDate = new Date();
const fullYear = currentDate.getFullYear();

const Footer = () => {
    return(
        <>
            <footer className="left-0 w-full h-[7vh] flex justify-between items-center bg-gray-300 fixed bottom-0 px-7 py-2">
                <section className="text-lg">
                    copyright {fullYear} || All rights are reserved
                </section>
                <section className="flex gap-3 justify-center items-center text-lg">
                    <a href="#"><BsFacebook/></a>
                    <a href="#"><BsInstagram/></a>
                    <a href="#"><BsLinkedin/></a>
                </section>
            </footer>
        </>
    );
}

export default Footer;