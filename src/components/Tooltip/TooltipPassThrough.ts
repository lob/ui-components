import { TooltipDirectivePassThroughOptions } from 'primevue/tooltip';

export const TooltipPassThrough: TooltipDirectivePassThroughOptions = {
  root: {
    class: 'absolute p-2 fadein',
    style: 'animation: fadeIn 0.25s;'
  },
  arrow: ({ context }) => ({
    class: [
      'absolute border-transparent border-solid',
      'w-0 h-0',
      {
        '!border-r-gray-900':
          context?.right ||
          (!context?.right &&
            !context?.left &&
            !context?.top &&
            !context?.bottom),
        '!border-l-gray-900': context?.left,
        '!border-t-gray-900': context?.top,
        '!border-b-gray-900': context?.bottom
      }
    ],
    style: (() => {
      if (
        context?.right ||
        (!context?.right && !context?.left && !context?.top && !context?.bottom)
      ) {
        return {
          'border-width': '0.5rem 0.5rem 0.5rem 0',
          'margin-top': '-0.5rem'
        };
      }
      if (context?.left) {
        return {
          'border-width': '0.5rem 0 0.5rem 0.5rem',
          'margin-top': '-0.5rem'
        };
      }
      if (context?.top) {
        return {
          'border-width': '0.5rem 0.5rem 0 0.5rem',
          'margin-left': '-0.5rem'
        };
      }
      if (context?.bottom) {
        return {
          'border-width': '0 0.5rem 0.5rem 0.5rem',
          'margin-left': '-0.5rem'
        };
      }
    })()
  }),
  text: {
    class: ['p-3 rounded-md', 'bg-gray-900', 'text-white text-sm type-sm-600'],
    style: 'max-width: 280px;'
  }
};
