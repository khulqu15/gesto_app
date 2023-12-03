<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div class="bg-gradient-to-t from-base-300 to-base-200 min-h-screen">
        <navbar-view />
            <div class="w-full min-h-[60vh] relative container px-6 my-12 mx-auto">
                <div class="p-6 bg-base-100/30 shadow-2xl shadow-black/10 max-w-md w-full backdrop-blur-lg mx-auto rounded-3xl">
                    <div class="px-6 py-0 relative mt-4 -top-4 inline-block">
                        <h2 class="text-4xl leading-relaxed break-words text-base-content">Log In
                        <div class="inline-block w-48 h-10 overflow-hidden rounded-2xl relative top-1">
                            <img src="/assets/images/wall1.png" class="w-full h-full object-center object-cover absolute top-0 left-0" alt="Image">
                        </div>
                        </h2>
                    </div>
                    <div class="px-6 py-6">
                        <ion-button fill="clear" class="btn btn-primary w-full normal-case">
                            <Icon icon="bi:google"  class="text-xl mr-3"/> Log In with Google
                        </ion-button>
                        <div class="form-control mt-6">
                            <label for="email" class="text-sm text-base-content/50 font-medium">Username or Email Address</label>
                            <input type="text" class="input mt-3 w-full" placeholder="hello@michinavi.com">
                        </div>
                        <div class="form-control mt-6">
                            <label for="password" class="text-sm text-base-content/50 font-medium">Password</label>
                            <input type="password" class="input mt-3 w-full">
                        </div>
                        <ion-button fill="clear" class="btn bg-black text-white mt-6">Log In</ion-button>
                    </div>
                </div>
            </div>
            <div class="relative w-full bottom-0 left-0 py-6 mt-12 flex justify-center text-base-content">
                2023 Developed by <span class="text-primary ml-1 font-semibold"><a href="https://hayago.id" target="_blank">Hayago</a></span>
            </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
    
<script setup lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import NavbarView from '@/components/NavbarView.vue';
</script>