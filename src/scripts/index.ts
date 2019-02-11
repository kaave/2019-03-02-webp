import './common/initializer';
import * as SupportTable from './modules/SupportTable';
import * as PictureAndLabel from './modules/PictureAndLabel';
import * as VisualEffects from './modules/VisualEffects';

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
  const main = new Main();
  console.log(main);
});
