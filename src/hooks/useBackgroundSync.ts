import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

export const useBackgroundSync = (botActive: boolean) => {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      // Em navegador, usa Web Worker
      if ('serviceWorker' in navigator && botActive) {
        navigator.serviceWorker.register('/background.js')
          .then(registration => {
            console.log('[Web] Service Worker registrado para execução em background');
          })
          .catch(error => {
            console.error('[Web] Erro ao registrar Service Worker:', error);
          });
      }
    }
  }, [botActive]);

  useEffect(() => {
    // Previne que a tela adormeça quando o bot está ativo
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && botActive) {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
          console.log('[Wake Lock] Tela mantida ativa');
        } catch (err) {
          console.error('[Wake Lock] Erro:', err);
        }
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
        console.log('[Wake Lock] Liberado');
      }
    };
  }, [botActive]);
};
