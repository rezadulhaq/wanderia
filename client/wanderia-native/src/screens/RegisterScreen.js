import { View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../config/firebase'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: username, photoURL: imgUrl?imgUrl:`https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg`})
        .then(() => console.log('success register'))
      })
      .catch((error) => alert(error.message));
  }



  return (
    <View className='flex-1 items-center justify-center p-4'>
      <Input 
        placeholder='Enter your username'
        label='username'
        value={username}
        leftIcon={{ type: 'feather', name: 'at-sign' }}
        onChangeText={(text) => setUsername(text)}
      />
      <Input 
        placeholder='Enter your photo url'
        label='imgUrl'
        value={imgUrl}
        leftIcon={{ type: 'material', name: 'person' }}
        onChangeText={(text) => setImgUrl(text)}
      />
      <Input 
        placeholder='Enter your email'
        label='Email'
        value={email}
        leftIcon={{ type: 'material', name: 'email' }}
        onChangeText={(text) => setEmail(text)}
      />
      <Input 
        placeholder='Enter your password'
        label='password'
        value={password}
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View className='flex-row gap-4'>
        <Button title='Register' onPress={handlRegister}/>
      </View>
    </View>
  )
}

export default RegisterScreen