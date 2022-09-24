import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import { load, addCertificates, consultCertificates, addAddress} from '../src/funcs';
import { ethers } from "ethers";
import Punto2JSON from "../build/contracts/Punto2.json"

const Home: NextPage = () => {
  const [inputConsult, setInputConsult] = React.useState<number>(0);
  const [inputID, setInputID] = React.useState<number>(0);
  const [inputName, setInputName] = React.useState<string>('');
  const [inputDate, setInputDate] = React.useState<string>('');
  const [inputCourse, setInputCourse] = React.useState<string>('');
  const [inputAddress, setInputAddress] = React.useState<string>('');


  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [superContract, setContract] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState<boolean>(true);



  const handleInputChangeForConsult = (e: any) => setInputConsult(e.currentTarget.value);
  const handleInputChangeForId = (e: any) => setInputID(e.currentTarget.value);
  const handleInputChangeForName = (e: any) => setInputName(e.currentTarget.value);
  const handleInputChangeForDate = (e: any) => setInputDate(e.currentTarget.value);
  const handleInputChangeForCourse = (e: any) => setInputCourse(e.currentTarget.value);
  const handleInputChangeForAddress = (e: any) => setInputAddress(e.currentTarget.value);


  const handleConsult = async () => {
    
    alert("If you don't receive another alert then you don't have permissions")
    const consult = await consultCertificates(inputConsult);
    if (consult.length === 0) {
      alert("That certificate doesn't exist.")
    } else if (consult.length === 2) {
      alert(`Course: ${consult[1]} coursed by: ${consult[0]}`)
    }
    setInputConsult(0);
    // await contract.checkCertified(id, {from: addressAccount})
  }

  const handleCreateCertificate = async () => {
    alert("If you don't receive another alert then you don't have permissions")
    await addCertificates(inputName, inputID, inputDate, inputCourse);
    setInputName("");
    setInputID(0);
    setInputDate("");
    setInputCourse("");
    // console.log(certified );
    alert("You have added a new certificate(of course if you don't use a previous id)")

  }

  const handleAddAddress = async () => {
    alert("If you don't receive another alert then you don't have permissions")
    await addAddress(inputAddress);
    alert("You have added a new address")
  }

  // React.useEffect(() => {
  //   if (!refresh) return;
  //   setRefresh(false);
  //   load().then((e) => {
  //     setAddresAccount(e.addressAccount);
  //     setContract(e.punto2Contract);
  //   });
  // });

  return (
    <VStack>
      <Head>
        <title>Certificado de Notas BEGUE</title>
        <meta name="description" content="Blockchain TodoList." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HStack w='50vw'>
        <Spacer />
        <VStack>
          <Heading>Grades Certificates</Heading>
          <Box h='100px' />
          <HStack w='md'>
            <Input
              type='number'
              size='md'
              placeholder='ID_Certificate'
              onChange={handleInputChangeForConsult}
              value={inputConsult}
            />
            <Spacer />
            <Button onClick={handleConsult} w='200px' bg='green.200'>Consult</Button>
          </HStack>

          <HStack w='md'>
            <Input
              type='text'
              size='md'
              placeholder="Student Name"
              onChange={handleInputChangeForName}
              value={inputName}
            />
            <Input
              type='number'
              size='md'
              placeholder='id'
              onChange={handleInputChangeForId}
              value={inputID}
            />
            <Input
              type='month'
              size='md'
              placeholder='date'
              onChange={handleInputChangeForDate}
              value={inputDate}
            />
            <Input
              type='text'
              size='md'
              placeholder='Course Name'
              onChange={handleInputChangeForCourse}
              value={inputCourse}
            />
            <Spacer />
            <Button onClick={handleCreateCertificate} w='200px' bg='green.200'>Add</Button>
          </HStack>
          <HStack>
            <Input
              type='text'
              size='md'
              placeholder='New Address'
              onChange={handleInputChangeForAddress}
              value={inputAddress}
            />
            <Spacer />
            <Button onClick={handleAddAddress} w='200px' bg='green.200'>Add Address</Button>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default Home
