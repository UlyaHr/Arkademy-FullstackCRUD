const router = require("express").Router();
const db = require("./config/db");

const errorHandle = (res, err) => {
  console.log(err);
  res.status(500).json({ status: "Gagal!" });
};

router.get("/produk", async (req, res) => {
  try {
    const [rows] = await db.query(`
            SELECT * FROM produk
         `);
    res.status(200).json({
      status: "Berhasil!",
      data: rows,
    });
  } catch (error) {
    errorHandle(res, error);
  }
});

router.post("/produk", async (req, res) => {
  try {
    const [{ insertId }] = await db.query("INSERT INTO produk SET ?", {
      nama_produk: req.body.nama_produk,
      harga: req.body.harga,
      jumlah: req.body.jumlah,
      keterangan: req.body.keterangan,
    });
    res.status(200).json({
      status: "Berhasil!",
      id: insertId,
      message: `Data ${req.body.nama_produk} berhasil ditambahkan!`,
    });
  } catch (error) {
    errorHandle(res, error);
  }
});

router.put("/produk/:id", async (req, res) => {
  try {
    await db.query(
      "UPDATE `produk` SET `nama_produk` = ?, `keterangan` = ?, `harga` = ?, `jumlah` = ? WHERE `id` = ?",
      [req.body.nama_produk, req.body.keterangan, req.body.harga, req.body.jumlah, req.params.id]
    );
    res.status(200).json({
      status: "Berhasil!",
      message: `Data ${req.body.nama_produk} Berhasil Diubah!`,
    });
  } catch (err) {
    errorHandle(res, err);
  }
});

router.delete("/produk/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM `produk` WHERE `id` = ?", [req.params.id]);
    res.status(200).json({
      status: "Berhasil",
    });
  } catch (err) {
    errorHandle(res, err);
  }
});

module.exports = router;
