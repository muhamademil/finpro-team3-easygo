// import {Router} from 'express'
// import { PropertyController } from '@/controllers/property.controller'

// export class PropertyRouter {
//   private router: Router;
//   private propertyController: PropertyController;

//   constructor() {
//     this.router = Router();
//     this.propertyController = new PropertyController();
//     this.setRoutes();
//   }

//     private setRoutes():void {
//         this.router.post('/', this.propertyController.create.bind(this.propertyController));
//         this.router.get('/', this.propertyController.findAll.bind(this.propertyController));
//         this.router.get('/:id', this.propertyController.findById.bind(this.propertyController));
//         this.router.put('/:id', this.propertyController.update.bind(this.propertyController));
//         this.router.delete('/:id', this.propertyController.delete.bind(this.propertyController));
//     }

//     public getRouter(): Router {
//         return this.router;
//     }
// }
