import { UniqueIdentifier } from '@dnd-kit/core';
import { DragAndDropContainer } from '../../../types/dragndrop/types';
import { ExampleComponent } from '../../../common/ExampleComponent';
import { IconButtonComponent } from '../../../common/IconButtonComponent';

export function findContainerId(
  containers: DragAndDropContainer[],
  itemId: UniqueIdentifier | undefined
) {
  if (containers.some((container) => container.id === itemId)) {
    return itemId;
  }
  return containers.find((container) =>
    container.items.some((item) => item.id === itemId)
  )?.id;
}

export const containerLayouts: { [key: string]: DragAndDropContainer[] } = {
  '1-1-1': [
    {
      id: '1',
      ratio: 1,
      items: [
        {
          id: 100,
          component: <ExampleComponent text={'some text here'} />,
        },
        {
          id: 101,
          component: <ExampleComponent text={'this is another one'} />,
        },
        {
          id: 102,
          component: (
            <ExampleComponent
              text={
                'some more stuff with a lot of text that should make this one bigger theoretically but also for sure..Look at me Im bigger than the others! Who wants only fixed height components here, right?'
              }
            />
          ),
        },
      ],
    },
    {
      id: '2',
      ratio: 1,
      items: [
        {
          id: 200,
          component: <ExampleComponent text={'figure out how this works'} />,
        },
        {
          id: 201,
          component: <ExampleComponent text={'with any component inside'} />,
        },
        { id: 202, component: <IconButtonComponent /> },
      ],
    },
    {
      id: '3',
      ratio: 1,
      items: [],
    },
  ],
  '2-1-2': [
    {
      id: '1',
      ratio: 2,
      items: [],
    },
    {
      id: '2',
      ratio: 1,
      items: [],
    },
    {
      id: '3',
      ratio: 2,
      items: [],
    },
  ],
  '2-4': [
    {
      id: '1',
      ratio: 2,
      items: [],
    },
    {
      id: '2',
      ratio: 4,
      items: [],
    },
  ],
};
