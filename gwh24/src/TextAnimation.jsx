import './TextAnimation.css';
import {ReactTyped} from "react-typed";

function TextAnimation() {
    return (
        <div>
           I'm feeling{" "}
            <ReactTyped
            strings={["happy :)", "sad :(", "okay :/"]}
            typeSpeed={100}
            loop
            backSpeed={20}
            cursorChar="|"
            showCursor={true}
            />
        </div>
        
    );
}

export default TextAnimation;