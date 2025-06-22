// import { Request, Response } from "express";
// import { PropertyService } from "@/services/property.service";
// import { PropertyQuery } from "@/models/property.interface";

// export class PropertyController {
//   private propertyService = new PropertyService();

//   public async create(req: Request, res: Response) {
//     try {
//     // const tenantId = req.user?.id;
//       const tenantId = 7 // jika sudah ada auth, ganti dengan req.user?.id
//       const input = req.body;

//       console.log("Creating property with input:", input);

//       const property = await this.propertyService.createProperty(tenantId, req.body);

//       res.status(201).json(property);
//     } catch (error) {
//       console.error("Create Property Error:", error);
//       res.status(500).json({ error: "Failed to create property" });
//     }
//   }

//   public async findAll(req: Request, res: Response) {
//     try {
//       const query = req.query as unknown as PropertyQuery;
//       const properties = await this.propertyService.getAllProperties(query);
//       res.json(properties);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to get properties" });
//     }
//   }

//   public async findById(req: Request, res: Response) {
//     try {
//       const property = await this.propertyService.getPropertyById(req.params.id);
//       if (!property) return res.status(404).json({ error: "Property not found" });
//       res.json(property);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to get property" });
//     }
//   }

//   public async update(req: Request, res: Response) {
//     try {
//       const updated = await this.propertyService.updateProperty(req.params.id, req.body);
//       res.json(updated);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to update property" });
//     }
//   }

//   public async delete(req: Request, res: Response) {
//     try {
//       await this.propertyService.deleteProperty(req.params.id);
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete property" });
//     }
//   }
// }
