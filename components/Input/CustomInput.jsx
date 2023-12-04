import { View, TextInput,Button } from 'react-native'
import styles from './Styles'

const CustomInput = ({
    placeholderProp,
    onChangeTextHandlerEvent,
    textItemProp,
    listTaskEvent,
}) => {



    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholderProp}
                style={styles.textInput}
                onChangeText={onChangeTextHandlerEvent}
                value={textItemProp}
            />
            <Button
                title='+'
                onPress={listTaskEvent}
            />
        </View>
    )

}

export default CustomInput