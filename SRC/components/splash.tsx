import {ResizeMode, Video, AVPlaybackStatus } from "expo-av";
import React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { hideAsync } from "expo-splash-screen";



type Props = {
    onComplete: (status: boolean) => void;
}

export function Splash({ onComplete } : Props) {
    const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

    function onPlaybackStatusUpdate(status: AVPlaybackStatus){
        if(status.isLoaded){
            if(lastStatus.isLoaded !== lastStatus.isLoaded) {
                hideAsync();
            }

            if(status.didJustFinish){
                onComplete(true);

            }
        }

    }

    return(
        <Video
        style= {StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        source={require('../../assets/splash.mp4')}
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        shouldPlay={true}
        />
    )
}