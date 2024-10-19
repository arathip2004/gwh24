import './TextAnimation.css';
import {ReactTyped} from "react-typed";

function TextAnimation() {
    return (
        <div class = "textanimation">
           I'm feeling{" "}
           <div class = "typedwords">
            <ReactTyped
            strings={["happy :)", "sad :(", "okay :/"]}
            typeSpeed={100}
            loop
            backSpeed={20}
            cursorChar="|"
            showCursor={true}
            />
            </div>
        </div>
        
    );
}

export default TextAnimation;