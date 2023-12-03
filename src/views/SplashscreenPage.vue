<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="w-full flex items-center justify-center min-h-screen relative">
        <div>
          <img src="/assets/images/logo.png" alt="Logo" class="w-20 logo-splash h-20">
        </div>
        <div class="absolute w-full bottom-0 left-0 py-6 flex justify-center">
          2023 Developed by <span class="text-primary ml-1 font-semibold"><a href="hayago.id" target="_blank">Hayago</a></span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { onMounted } from "vue";
import { useIonRouter } from '@ionic/vue';

const ionRouter = useIonRouter();

onMounted(() =>{
  setTimeout(() => {
    ionRouter.push('/home')
    console.log('halo')
  }, 2500)
})
</script>

<style scoped>
.logo-splash {
  transform: scale(2);
  filter: blur(3rem);
  animation-name: animateku;
  animation-delay: 500ms;
  animation-fill-mode: both;
  animation-duration: 500ms;
}

@keyframes animateku {
  0% {
    transform: scale(2);
    filter: blur(3rem);
  }
  100% {
    transform: scale(1);
    filter: blur(0);
  }
}
</style>