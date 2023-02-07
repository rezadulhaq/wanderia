import { Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Icons from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ChatUser = ({ username }) => {
  const navigator=useNavigation()
  return (
    <TouchableOpacity className='bg-gray-300 rounded-xl flex-row items-center gap-x-1 px-1 border-[1px]' onPress={()=>navigator.navigate('ChatScreen',{username})}>
      <Icons.FontAwesome name='user-circle-o'/>
      <Text className='py-1 pr-1'>{ username }</Text>
    </TouchableOpacity>
  )
}

export default ChatUser