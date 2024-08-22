import { View, Text, Image } from "react-native"

function AddPlantCard(props) {

    const { plant } = props;

    return (

        <View>
            <Text>
                {plant.common_name}
            </Text>
        </View>
    )

}

export default AddPlantCard