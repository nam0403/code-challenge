import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { name, email, age, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
    }

  const existing = await repo.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "email already exists" });
  }

  const user = repo.create({ name, email, age, status: status ?? "active" });
  const saved = await repo.save(user);
  return res.status(201).json(saved);
});

router.get("/", async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const { q, status, minAge, maxAge, limit = "20", offset = "0" } = req.query;

  let qb = repo.createQueryBuilder("user");

  if (q && typeof q === "string") {
    qb.andWhere("(user.name LIKE :q OR user.email LIKE :q)", { q: `%${q}%` });
  }

  if (status && typeof status === "string") {
    qb.andWhere("user.status = :status", { status });
  }

  if (minAge && !isNaN(Number(minAge))) {
    qb.andWhere("user.age >= :minAge", { minAge: Number(minAge) });
  }

  if (maxAge && !isNaN(Number(maxAge))) {
    qb.andWhere("user.age <= :maxAge", { maxAge: Number(maxAge) });
  }

  qb.orderBy("user.createdAt", "DESC");
  qb.skip(Number(offset)).take(Math.min(Number(limit), 100));

  const [users, total] = await qb.getManyAndCount();
  return res.json({ data: users, meta: { total } });
});

router.get("/:id", async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ id: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json(user);
});

router.put("/:id", async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ id: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, age, status } = req.body;

  if (email && email !== user.email) {
    const existing = await repo.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "email already exists" });
    }
  }

  Object.assign(user, { name, email, age, status });
  const updated = await repo.save(user);
  return res.json(updated);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(User);
  const user = await repo.findOneBy({ id: req.params.id });
  if (!user) return res.status(404).json({ message: "User not found" });

  await repo.remove(user);
  return res.status(204).send();
});

export default router;
