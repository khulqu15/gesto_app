<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div class="fixed w-full h-full flex items-center justify-center bg-base-200 z-20 transition-all" :class="{'-left-[100%] opacity-0 invisible': emailLocal, 'left-0 top-0': !emailLocal}">
            <div class="absolute top-0 left-0 p-3 rounded-br-3xl inline-block bg-base-100">
                <ion-button onclick="back_modal.showModal()" fill="clear" class="btn rounded-xl btn-sm px-0"
                :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}">Back</ion-button>
            </div>
            <div class="max-w-md w-full p-6 rounded-3xl">
                <form @submit.prevent="submitUserForm" class="text-2xl">
                    <h2 class="text-2xl leading-relaxed text-base-content mb-12">Hi, To Start Demo 
                        <div class="inline-block w-24 h-8 overflow-hidden rounded-2xl relative top-2">
                            <img src="/assets/images/wall3.jpg" class="w-full h-full object-center object-cover absolute top-0 left-0" alt="Image">
                        </div>
                        <br> 
                        Enter Your Email
                    </h2>
                    <div class="form-control space-y-3">
                        <label for="email" class="text-sm text-base-content/50">Email Address</label>
                        <input id="email" v-model="email" placeholder="eg. ninno@example.com" type="email" required class="input text-base-content w-full bg-base-100">
                        <label for="email" id="email_error" class="text-error"></label>
                    </div>
                    <ion-button type="submit" fill="clear" class="btn bg-black text-white mt-6">Start</ion-button>
                </form>
            </div>
        </div>
        <div :key="contentKey">
            <div id="container" class="relative min-h-screen overflow-hidden">
                <div class="absolute w-full top-0 flex items-center justify-center">
                    <div id="label-container" class="bg-white p-3" ref="labelContainer"></div>
                </div>
                <!-- <canvas id="annotations" ref="canvas" class="absolute left-0 top-0 w-full h-full"></canvas> -->
                <div ref="webcamContainer" id="webcamContainer">
                    <video id="camera_view" class="absolute left-0 top-0 w-full h-full" ref="videoElement" autoplay playsinline></video>
                </div>
                <div class="absolute bottom-0 left-0 w-full flex items-center justify-center">
                    <div class="p-3 rounded-t-3xl inline-block bg-base-100">
                        <ion-button onclick="option_modal.showModal()" fill="clear" size="small" class="btn px-0 rounded-xl"
                        :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}"><Icon icon="mingcute:up-fill" class="text-2xl"/></ion-button>
                    </div>
                </div>
                <div class="grid grid-cols-1 absolute top-0 left-0 p-3 rounded-br-3xl inline-block bg-base-100">
                    <ion-button onclick="back_modal.showModal()" fill="clear" class="btn rounded-xl md:btn-md btn-sm px-0 relative top-1"
                    :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}">Back</ion-button>
                </div>
                <div class="p-4 absolute top-0 right-0 bg-base-100/10 flex items-center gap-2 z-20 rounded-bl-3xl backdrop-blur-lg inline-block">
                    <div v-if="cameras.length > 1">
                        <ion-button fill="clear" class="px-0 rounded-xl md:btn-md btn-sm border-0" :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}" onclick="my_modal_2.showModal()">
                            <Icon icon="solar:camera-bold" class="text-xl mr-2"/>
                            {{ cameraLabel.length > 7 ? cameraLabel.substring(0, 7) + '...' : cameraLabel }}
                        </ion-button>
                        <dialog id="my_modal_2" class="modal">
                            <div class="modal-box p-0">
                                <div class="p-4 w-full">
                                    <form method="dialog">
                                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content text-xl">✕</button>
                                    </form>
                                    <h3 class="font-bold text-lg text-base-content">Select Cam Device</h3>
                                </div>
                                <form method="dialog" class="space-y-2 max-h-[40vh] overflow-y-auto p-4 w-full overflow-x-hidden">
                                    <ion-button type="submit" @click="switchCam(item.deviceId)" fill="clear" v-for="item, index in cameras" :key="item.deviceId" class="w-full hover:bg-base-200 text-base-content transition-all rounded-xl p-4"
                                    :class="{'bg-base-200': item.deviceId == camera, 'bg-base-100': item.deviceId != camera}">
                                        {{ item.label ? item.label : 'Camera '+ (index+1) }}
                                    </ion-button>
                                </form>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                    <div>
                        <ion-button fill="clear" @click="emailLocal = null" class="btn px-0 rounded-xl md:btn-md btn-sm border-0"
                        :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}"><Icon icon="solar:user-bold-duotone" class="text-2xl"/></ion-button>
                        <ion-button @click="clickVideo()" fill="clear" class="btn px-0 rounded-xl md:btn-md btn-sm border-0"
                        :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}"><Icon icon="solar:upload-bold-duotone" class="text-2xl"/></ion-button>
                        <input type="file" @change="uploadVideo($event)" class="hidden" id="video_upload" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,video/ogg">
                    </div>
                </div>
            </div>
            <dialog id="option_modal" class="modal modal-bottom z-[500]">
                <div class="modal-box max-w-2xl w-full mx-auto p-0">
                    <form method="dialog" class="w-full flex justify-center py-4">
                        <button id="optionModal" class="btn px-3 bg-black text-white rounded-xl"><Icon icon="mingcute:down-fill" class="text-2xl"/></button>
                    </form>
                    <div class="px-6">
                        <h3 class="font-bold text-lg font-bold text-base-content">Data Captured <div class="badge badge-primary">{{ (data === null || data === undefined || data === '') ? 0 : Object.keys(data).length }}</div></h3>
                    </div>
                    <div class="max-h-[50vh] overflow-y-auto">
                        <div class="space-y-3 px-6 pb-6">
                            <div v-if="isLoad" class="text-center">
                                <span class="loading loading-dots text-base-content loading-lg"></span>
                            </div>
                            <div v-else>
                                <div v-if="data" class="space-y-3">
                                    <label for="detail_modal" v-for="item, key in data" @click="setSelected(key)" role="button" :key="key" class="md:flex justify-between p-4 bg-base-200 rounded-xl items-center">
                                        <div class="relative text-base-content">
                                            <h4 class="font-semibold my-0 mb-2 text-base-content">{{ formattedName(item.image) }} ({{ item.width }}, {{ item.height }})</h4>
                                            <div class="flex items-center gap-x-3">
                                                <Icon icon="heroicons:map-pin-20-solid" class="text-xl text-primary"/> 
                                                <span class="text-sm text-base-content">{{ item.coordinate }}</span>
                                            </div>
                                        </div>
                                        <img :src="item.imageFile"  alt="RecordedDataNih" class="md:w-24 w-full md:mt-0 mt-4 md:h-32 h-24 rounded-lg object-cover object-center">
                                    </label>
                                </div>
                                <div v-else></div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
            <dialog id="back_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕</button>
                    </form>
                    <h3 class="font-bold text-lg text-base-content">Are you sure ?</h3>
                    <form method="dialog" class="grid grid-cols-3 gap-x-4">
                        <ion-button type="submit" class="btn btn-ghost w-full normal-case text-base-content" fill="clear">Cancel</ion-button>
                        <ion-button type="submit" router-link="/home" router-direction="forward" class="btn w-full normal-case" :class="{'bg-black text-white': theme == 'light', 'bg-white text-black': theme == 'dark'}" fill="clear">Back</ion-button>
                        <ion-button type="submit" @click="stopStream()" class="btn btn-error normal-case" fill="clear">Stop</ion-button>
                    </form>
                </div>
            </dialog>
            <label for="loading_modal" class="btn hidden">open modal</label>

            <!-- Put this part before </body> tag -->
            <input type="checkbox" id="loading_modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Video Uploading ({{ progressUpload }}%)</h3>
                    <progress class="progress progress-primary w-full h-3" :value="progressUpload" max="100"></progress>
                    <div class="modal-action">
                        <label for="loading_modal" @click="cancelVideo()" class="btn btn-ghost mt-3">Cancel</label>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="detail_modal" class="modal-toggle" />
            <div class="modal fixed z-[1000]">
                <div class="modal-box max-w-2xl w-full"  v-if="!(data === null || data === undefined || data === '') && !(dataSelected == null || dataSelected == '')">
                    <h3 class="font-semibold my-0 mb-2 text-base-content">{{ formattedName(data[dataSelected].image) }} ({{ data[dataSelected].width }}, {{ data[dataSelected].height }})</h3>
                    <div class="flex items-center gap-x-3 mb-4">
                        <Icon icon="heroicons:map-pin-20-solid" class="text-xl text-primary"/> 
                        <span class="text-sm text-base-content">{{ data[dataSelected].coordinate }}</span>
                    </div>
                    <img :src="data[dataSelected].imageFile"  alt="RecordedDataNih" class="w-full h-full md:mt-0 mt-4 rounded-lg object-cover object-center">
                    <label class="btn btn-ghost text-base-content mt-3 modal-backdrop" for="detail_modal">Close</label>
                </div>
            </div>
        </div>
      </ion-content>
    </ion-page>
</template>
  

<script setup lang="ts">

require('@tensorflow/tfjs-backend-webgl')

import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { db, storage } from '@/firebase';
import { onValue, ref as dbRef } from 'firebase/database'
import { ref as storageRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const router = useIonRouter()
const videoElement: Ref<HTMLVideoElement|null> = ref(null)
const stream: Ref<MediaStream|null> = ref(null)
const theme = ref('')
const camera = ref('')
const contentKey: Ref<number> = ref(0)
const cameras: Ref<any> = ref([])
const user: any = ref()
const email: Ref<any> = ref('')
const emailLocal: Ref<any> = ref(null)
const cameraLabel: Ref<any> = ref(null)
const data: Ref<any> = ref()
const dataSelected: Ref<any> = ref('')
const isLoad: Ref<boolean> = ref(true)
const videoUrl: any = ref(null);
const isUploading = ref<boolean>(false);
const uploadTask = ref<any>(null);

const progressUpload: any = ref(0)
const modelURL = ref('https://raw.githubusercontent.com/khulqu15/michinavi/main/public/model/model.json');
const metadataURL = ref('https://raw.githubusercontent.com/khulqu15/michinavi/main/public/model/metadata.json');
const labelContainer: Ref<HTMLElement|null> = ref(null)
const model: Ref<any> = ref('')
const webcamContainer: Ref<HTMLElement|null> = ref(null)
const webcam: Ref<any> = ref('')
const maxPredictions: Ref<any> = ref('')
const isIos: Ref<boolean> = ref(false)

async function getImageDimensions(src: string): Promise<{ width: number, height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.src = src;
  });
}


onMounted(async() => {
    try {
        tf.setBackend('webgl').then(() => {
            console.log('Backend set to webgl');
            initModel();
        })
        await tf.ready();

        theme.value = localStorage.getItem('theme') || 'light';
        emailLocal.value = localStorage.getItem('email') || null
        email.value = localStorage.getItem('email') || null
        await getAvailableCam()
        getLocalUser()
        getDataCam()
        if (window.navigator.userAgent.indexOf('iPhone') > -1 || window.navigator.userAgent.indexOf('iPad') > -1)
            isIos.value = true;
        if(emailLocal.value) startWebStream()
    } catch(error) {
        console.error("Error with TensorFlow.js initialization:", error);

    }

})

async function initModel() {
  try {
    if (modelURL.value && metadataURL.value) {
        console.log('Loading model from:', modelURL.value);
        console.log('Loading metadata from:', metadataURL.value);
        model.value = await tmImage.load(modelURL.value, metadataURL.value);
        console.log(model.value)
        maxPredictions.value = model.value.getTotalClasses();
        
        if (labelContainer.value) {
            labelContainer.value.innerHTML = "";
            for (let i = 0; i < maxPredictions.value; i++) {
            const div = document.createElement("div");
            labelContainer.value.appendChild(div);
            }
        }
        }
    } catch (error) {
        console.error('An error occurred while initializing the model:', error);
    }
}

const predict = async () => {
  if (webcam.value && model.value) {
    const prediction = await model.value.predict(webcam.value.webcam);
    for (let i = 0; i < maxPredictions.value; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        if(labelContainer.value) 
            labelContainer.value.childNodes[i].textContent = classPrediction;
        console.log(classPrediction)
    }
  }
};

const startWebStream = async() => {
    try {
        // await initModel();
        // stream.value = await navigator.mediaDevices.getUserMedia({
        //     video: true
        // })
        // if(videoElement.value) videoElement.value.srcObject = stream.value
        webcam.value = new tmImage.Webcam(200, 200);
        if (webcamContainer.value && webcam.value.canvas) {
            webcamContainer.value.innerHTML = webcam.value.canvas as unknown as string;
        }
        await webcam.value.setup();
        await webcam.value.play();
        console.log(webcam.value)
        window.requestAnimationFrame(loop);
    } catch(error) {
        console.error("Error accessing the webcam:", error);
    }
}

const loop = async () => {
  webcam.value.update(); // Update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
};

function getDataCam() {
    const dataRef = dbRef(db, 'michiapp/data')
    onValue(dataRef, async (snapshot) => {
        const dataResult = snapshot.val()
        const objectKeys = Object.keys(dataResult);
        for(const key of objectKeys) {
            if(dataResult[key]) {
                const dataItem = {...dataResult[key]};
                const dataImage = storageRef(storage, 'imageName.png');
                dataItem.imageFile = await getDownloadURL(dataImage);
                const dimensions = await getImageDimensions(dataItem.imageFile);
                dataItem.width = dimensions.width;
                dataItem.height = dimensions.height;
                dataResult[key] = dataItem;
            }
        }
        data.value = dataResult
        isLoad.value = false
    })
}

function setSelected(key: any) {
    dataSelected.value = key
    const buttonOptionModal = document.getElementById('optionModal')
    if(buttonOptionModal) buttonOptionModal.click()
}

function getLocalUser() {
    user.value = localStorage.getItem('item') || null
}

function submitUserForm() {
    localStorage.setItem('email', email.value)
    emailLocal.value = email.value
    getAvailableCam()
    startWebStream()
    contentKey.value += 1
}

function stopStream() {
    if (stream.value) {
        const tracks = stream.value.getTracks();
        tracks.forEach(track => track.stop());
        stream.value = null;
        setTimeout(() => {
            router.push('/home')
        }, 500);
    }
    stream.value = null;
}

const getAvailableCam = async() => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind == 'videoinput')
        cameras.value = videoDevices
        if(videoDevices.length > 0) {
            camera.value = videoDevices[0].deviceId
            cameraLabel.value = videoDevices[0].label
        }
    } catch(error) {
        console.error("Error getting available cameras:", error);
    }
}

function formattedName(imageName: string) {
    let formattedName = imageName.split('.')[0];
    formattedName = formattedName.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return formattedName;
}

const switchCam = async(deviceId: any) => {
    if(stream.value) stream.value.getTracks().forEach(track => track.stop())
    try {
        stream.value = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: deviceId }
        })
        if(videoElement.value) videoElement.value.srcObject = stream.value
        camera.value = deviceId
    } catch(error) {
        console.error("Error switching camera:", error);
    }
}

function clickVideo() {
    const videoUpload = document.getElementById('video_upload')
    if(videoUpload) videoUpload.click()
}

function uploadVideo(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const storageReference = storageRef(storage, '/' + file.name);
    uploadTask.value = uploadBytesResumable(storageReference, file);
    isUploading.value = true;
    document.getElementById('loading_modal')?.click()
    uploadTask.value.on('state_changed', (snapshot: any) => {
            progressUpload.value = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progressUpload.value + '% done');
        },
        (error: any) => {
            console.error("Error uploading video:", error);
            isUploading.value = false;
        },
        async () => {
            videoUrl.value = await getDownloadURL(uploadTask.value.snapshot.ref);
            console.log("Video uploaded successfully. URL:", videoUrl.value);
            isUploading.value = false;
            document.getElementById('loading_modal')?.click()
        }
    );
}

function cancelVideo() {
    if (uploadTask.value) {
        uploadTask.value.cancel();
        isUploading.value = false;
    }
}

onBeforeUnmount(() => {
    if(stream.value) {
        const tracks = stream.value.getTracks()
        tracks.forEach(track => track.stop())
    }
})
</script>

<style scoped>
#camera_view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
    background-size: cover;
    overflow: hidden;
}
</style>