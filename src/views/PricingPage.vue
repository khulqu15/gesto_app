<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="bg-base-100 min-h-screen">
        <navbar-view />
        <progress-view />
        <div class="relative w-full bottom-0 left-0 py-6 mt-12 flex justify-center text-base-content">
            2023 Developed by <span class="text-primary ml-1 font-semibold"><a href="https://hayago.id" target="_blank">Hayago</a></span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
    
<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import NavbarView from '@/components/NavbarView.vue';
import ProgressView from '@/components/ProgressView.vue';
</script>