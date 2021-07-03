import { MeydaAudioFeature, MeydaFeaturesObject } from 'meyda';
import { useEffect } from 'react';
import audioService from '~/services/AudioService';

export const useMeydaAnalyser = (
  features: MeydaAudioFeature[],
  onFrame: (features: Partial<MeydaFeaturesObject>) => void,
  bufferSize = 2048
) => {
  useEffect(() => {
    const analyzer = audioService.createMeydaAnalyzer(
      bufferSize,
      features,
      onFrame
    );

    return () => {
      analyzer.stop();
    };
  }, [features, bufferSize, onFrame]);
};
