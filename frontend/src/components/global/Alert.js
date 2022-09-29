import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Box, Flex, Image } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AlertContext } from '../../context/AlertState';

const Alert = () => {
	const { isAlertOpen,
		closeAlert,
		cancelAlertRef,
		alertImage,
		alertTitle,
		alertDesc,
		alertRButton,
		alertLButton,
	} = useContext(AlertContext);
	return (
		<>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={cancelAlertRef}
				onClose={closeAlert}
				isOpen={isAlertOpen}
				isCentered
				closeOnOverlayClick={false}
			>
				<AlertDialogOverlay />

				<AlertDialogContent p='20px' fontFamily='rubik'>
					{/* Image */}
					<Flex justifyContent='center'>
						<Image src={alertImage} alt='Image' boxSize='70px' />
					</Flex>
					{/* Head */}
					<Box textAlign='center' fontWeight='bold' fontSize='22px' mt='10px'>{alertTitle}</Box>
					{/* Desc */}
					<Box textAlign='center'>{alertDesc}</Box>
					{/* Button */}
					<Flex justify='space-between' mt='20px'>
						{/* <Button w='48%' ref={cancelRef} onClick={onClose}>Cancel</Button> */}
						{alertLButton}
						{alertRButton}
					</Flex>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default Alert
