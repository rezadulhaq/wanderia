import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect, useCallback } from 'react';
import * as Icons from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import ChatUser from '../components/ChatUser';

const HangoutScreen = () => {
  const navigator = useNavigation()
  const [messages, setMessages] = useState([])
  
  useLayoutEffect(()=>{
    const collectionRef = collection(database, 'bussiness1')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      })))
    })
    return () => unsubscribe()
  },[])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    addDoc(collection(database, 'bussiness1'), {
      _id,
      createdAt,
      text,
      user
    })
  })

  return (
    <View className='pt-10 flex-1 gap-0'>
      {/* Header */}
      <View className=' h-14 flex-row items-center justify-between p-4'>
        <TouchableOpacity className='w-8 h-8 items-center justify-center' onPress={navigator.goBack}>
          <Icons.Feather name='arrow-left' className='text-2xl'/>
        </TouchableOpacity>
        <View className=''>
          <Text className='text-xl font-semibold'>Bussiness Name</Text>
        </View>
        <View className='w-8 h-8'>
          {/* Hollow space to make space-between */}
        </View>
      </View>

      <View className='px-4 mt-2'>
        {/* Sub Header */}
        <View className='h-20'>
          <View>
            <Text className='text-lg font-semibold mb-1'>User at here</Text>
          </View>
          <View className='mt-3'>
            <ScrollView horizontal className='gap-2'>
              <View className='bg-[#3982F7] rounded-xl flex-row items-center gap-x-1 px-1 text-white border-[1px]'>
                <Text className='py-1 pr-1 text-white'>You</Text>
              </View>
              <View>
                <ChatUser username={'fahmifachrizal'}/>
              </View>
              <View>
                <ChatUser username={'user1'}/>
              </View>
              <View>
                <ChatUser username={'user2'}/>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Chats */}
      <View className='flex-1 w-full bg-white'>
        <GiftedChat 
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            avatar: auth?.currentUser?.photoURL
          }}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          bottomOffset={40}
        />
      </View>
    </View>
  )
}

export default HangoutScreen