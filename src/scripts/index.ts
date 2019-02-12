import './common/initializer';
import * as SupportTable from './ViewModels/SupportTable';
import * as PictureAndLabel from './ViewModels/PictureAndLabel';
import * as VisualEffects from './ViewModels/VisualEffects';

interface Managers {
  supportTable: SupportTable.IO;
  pictureAndLabel: PictureAndLabel.IO;
  visualEffects: VisualEffects.IO;
}

class Main {
  managers: Managers = {
    supportTable: SupportTable.create(),
    pictureAndLabel: PictureAndLabel.create(),
    visualEffects: VisualEffects.create(),
  };
}

window.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  const main = new Main();
});
