import { AnimationController, Animation } from '@ionic/angular';

export function slideAnimation(AnimationC: AnimationController): Animation {
  return AnimationC.create()
    .duration(500) // Duración de la animación en milisegundos
    .fromTo('transform', 'translateX(100%)', 'translateX(0)') // Desplazamiento desde la derecha
    .easing('ease-out'); // Función de aceleración
}
