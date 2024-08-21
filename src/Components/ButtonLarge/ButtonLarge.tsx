import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "../../@Types/ButtonProps";

const ButtonLager = (Props: ButtonProps) =>{
    return(
        <>
            <TouchableOpacity style={styles.buttonTouchLarge} onPress={Props.onKeyPress}>
                <Text style={styles.buttonsStyle}>{Props.text}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
      buttonTouchLarge: {
        backgroundColor: '#0d3b50',
        width: 192,
        height: 90,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        borderRadius: 10,
      },
      buttonsStyle: {
        fontSize: 40,
        color: 'white',
      }
})

export default ButtonLager;