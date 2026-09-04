import type { Request, Response, NextFunction } from "express";
import type { Prisma } from "../generated/prisma/client";
import prisma from "../lib/prisma";

/**
 * |--------------------------------------------------------------------------
 * | BLOG / NEWS & UPDATES CONTROLLER
 * |--------------------------------------------------------------------------
 *
 * Supported Types:
 *
 * INAUGURATION
 * PRESS_RELEASE
 * NEWSLETTER_ARCHIVE
 * POLITICAL_LEADERSHIP
 * DEFENCE_MILITARY_LEADERSHIP
 * INDUSTRY_PARTICIPATION
 *
 * |--------------------------------------------------------------------------
 */

/**
 * |--------------------------------------------------------------------------
 * | BLOG TYPES
 * |--------------------------------------------------------------------------
 */

const BLOG_TYPES = [
  "INAUGURATION",
  "PRESS_RELEASE",
  "NEWSLETTER_ARCHIVE",
  "POLITICAL_LEADERSHIP",
  "DEFENCE_MILITARY_LEADERSHIP",
  "INDUSTRY_PARTICIPATION",
] as const;

type BlogType = (typeof BLOG_TYPES)[number];

/**
 * |--------------------------------------------------------------------------
 * | HELPERS
 * |--------------------------------------------------------------------------
 */

function isValidBlogType(type: unknown): type is BlogType {
  return (
    typeof type === "string" &&
    BLOG_TYPES.includes(type as BlogType)
  );
}

function parseId(value: unknown): number | null {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function parseBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true" || value === "1") {
    return true;
  }

  if (value === "false" || value === "0") {
    return false;
  }

  return null;
}

function parseDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function normalizeString(
  value: unknown,
): string | null {
  if (
    value === undefined ||
    value === null
  ) {
    return null;
  }

  const result = String(value).trim();

  return result === "" ? null : result;
}

function normalizeRequiredString(
  value: unknown,
): string {
  return String(value ?? "").trim();
}

/**
 * |--------------------------------------------------------------------------
 * | TAGS
 * |--------------------------------------------------------------------------
 *
 * Accepts:
 *
 * ["Artillery Systems", "Energetics"]
 *
 * OR
 *
 * "Artillery Systems,Energetics"
 *
 * OR
 *
 * '["Artillery Systems","Energetics"]'
 *
 * |--------------------------------------------------------------------------
 */

function normalizeTags(
  value: unknown,
): Prisma.InputJsonValue | null {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  if (Array.isArray(value)) {
    return value
      .map((tag) => String(tag).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed
          .map((tag) => String(tag).trim())
          .filter(Boolean);
      }
    } catch {
      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
  }

  return null;
}

/**
 * |--------------------------------------------------------------------------
 * | SLUG GENERATOR
 * |--------------------------------------------------------------------------
 */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(
  title: string,
  excludeId?: number,
): Promise<string> {
  const baseSlug =
    slugify(title) ||
    `blog-${Date.now()}`;

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing =
      await prisma.blogPost.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
        },
      });

    if (
      !existing ||
      existing.id === excludeId
    ) {
      return slug;
    }

    counter += 1;

    slug = `${baseSlug}-${counter}`;
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog
 * |--------------------------------------------------------------------------
 * | Public - Get published blogs
 * |--------------------------------------------------------------------------
 *
 * Optional:
 *
 * ?type=INAUGURATION
 * ?type=PRESS_RELEASE
 * ?type=NEWSLETTER_ARCHIVE
 * ?type=POLITICAL_LEADERSHIP
 * ?type=DEFENCE_MILITARY_LEADERSHIP
 * ?type=INDUSTRY_PARTICIPATION
 *
 * ?page=1
 * ?limit=100
 * |--------------------------------------------------------------------------
 */

export async function getBlogs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      type,
      page = "1",
      limit = "100",
    } = req.query;

    const pageNumber = Math.max(
      Number(page) || 1,
      1,
    );

    const limitNumber = Math.min(
      Math.max(Number(limit) || 100, 1),
      100,
    );

    const where: {
      isPublished: boolean;
      type?: BlogType;
    } = {
      isPublished: true,
    };

    /**
     * Filter by type
     */
    if (type !== undefined) {
      if (!isValidBlogType(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid blog type",
          allowedTypes: BLOG_TYPES,
        });
      }

      where.type = type;
    }

    const [blogs, total] =
      await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: [
            {
              date: "desc",
            },
            {
              createdAt: "desc",
            },
          ],
          skip:
            (pageNumber - 1) *
            limitNumber,
          take: limitNumber,
        }),

        prisma.blogPost.count({
          where,
        }),
      ]);

    return res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(
          total / limitNumber,
        ),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog/:slug
 * |--------------------------------------------------------------------------
 * | Public - Get one published blog
 * |--------------------------------------------------------------------------
 */

export async function getBlogBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { slug } = req.params;

    const slugString = Array.isArray(slug)
      ? slug[0]
      : slug;

    if (!slugString) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    const blog =
      await prisma.blogPost.findFirst({
        where: {
          slug: slugString,
          isPublished: true,
        },
      });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog/type/:type
 * |--------------------------------------------------------------------------
 * | Public - Get blogs by type
 * |--------------------------------------------------------------------------
 */

export async function getBlogsByType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { type } = req.params;

    if (!isValidBlogType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog type",
        allowedTypes: BLOG_TYPES,
      });
    }

    const blogs =
      await prisma.blogPost.findMany({
        where: {
          type,
          isPublished: true,
        },
        orderBy: [
          {
            date: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      });

    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog/admin
 * |--------------------------------------------------------------------------
 * | Admin - Get all blogs
 * |--------------------------------------------------------------------------
 *
 * Optional:
 *
 * ?type=PRESS_RELEASE
 * ?search=GDIL
 * ?isPublished=true
 * ?page=1
 * ?limit=20
 * |--------------------------------------------------------------------------
 */

export async function getAdminBlogs(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      type,
      search = "",
      isPublished,
      page = "1",
      limit = "20",
    } = req.query;

    const pageNumber = Math.max(
      Number(page) || 1,
      1,
    );

    const limitNumber = Math.min(
      Math.max(Number(limit) || 20, 1),
      100,
    );

    const where: any = {};

    /**
     * Type filter
     */
    if (type !== undefined) {
      if (!isValidBlogType(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid blog type",
          allowedTypes: BLOG_TYPES,
        });
      }

      where.type = type;
    }

    /**
     * Published filter
     */
    if (isPublished !== undefined) {
      const parsedPublished =
        parseBoolean(isPublished);

      if (parsedPublished === null) {
        return res.status(400).json({
          success: false,
          message:
            "isPublished must be true or false",
        });
      }

      where.isPublished =
        parsedPublished;
    }

    /**
     * Search
     */
    if (
      typeof search === "string" &&
      search.trim()
    ) {
      const searchValue =
        search.trim();

      where.OR = [
        {
          title: {
            contains: searchValue,
          },
        },
        {
          slug: {
            contains: searchValue,
          },
        },
        {
          excerpt: {
            contains: searchValue,
          },
        },
        {
          location: {
            contains: searchValue,
          },
        },
        {
          personName: {
            contains: searchValue,
          },
        },
        {
          personRole: {
            contains: searchValue,
          },
        },
        {
          eventName: {
            contains: searchValue,
          },
        },
      ];
    }

    const [blogs, total] =
      await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy: [
            {
              date: "desc",
            },
            {
              createdAt: "desc",
            },
          ],
          skip:
            (pageNumber - 1) *
            limitNumber,
          take: limitNumber,
        }),

        prisma.blogPost.count({
          where,
        }),
      ]);

    return res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(
          total / limitNumber,
        ),
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog/admin/:id
 * |--------------------------------------------------------------------------
 * | Admin - Get one blog
 * |--------------------------------------------------------------------------
 */

export async function getAdminBlogById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(
      req.params.id,
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | POST /api/blog/admin
 * |--------------------------------------------------------------------------
 * | Admin - Create blog
 * |--------------------------------------------------------------------------
 */

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      title,
      slug,
      type,
      excerpt,
      content,
      image,
      documentUrl,
      date,
      location,
      tags,
      personName,
      personRole,
      eventName,
      link,
      isPublished,
    } = req.body;

    /**
     * Title
     */
    const titleString =
      normalizeRequiredString(title);

    if (!titleString) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    /**
     * Type
     */
    if (!isValidBlogType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog type",
        allowedTypes: BLOG_TYPES,
      });
    }

    /**
     * Date
     */
    const parsedDate =
      parseDate(date);

    if (!parsedDate) {
      return res.status(400).json({
        success: false,
        message:
          "Valid date is required",
      });
    }

    /**
     * Slug
     *
     * If Admin provides slug,
     * use it.
     *
     * Otherwise generate it
     * automatically from title.
     */
    let finalSlug: string;

    if (
      typeof slug === "string" &&
      slug.trim()
    ) {
      finalSlug =
        slugify(slug);
    } else {
      finalSlug =
        await generateUniqueSlug(
          titleString,
        );
    }

    /**
     * Check slug
     */
    const existing =
      await prisma.blogPost.findUnique({
        where: {
          slug: finalSlug,
        },
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Blog slug already exists",
      });
    }

    /**
     * Published status
     */
    const published =
      parseBoolean(isPublished);

    /**
     * Create
     */
const normalizedTags = normalizeTags(tags);

const blog = await prisma.blogPost.create({
  data: {
    title: normalizeRequiredString(title),
    slug: finalSlug,
    type,
    excerpt: normalizeString(excerpt),
    content: normalizeString(content),
    image: normalizeString(image),
    documentUrl: normalizeString(documentUrl),
    date: parsedDate,
    location: normalizeString(location),

    ...(normalizedTags !== null
      ? { tags: normalizedTags }
      : {}),

    personName: normalizeString(personName),
    personRole: normalizeString(personRole),
    eventName: normalizeString(eventName),
    link: normalizeString(link),
    isPublished: parseBoolean(isPublished) ?? false,
  },
});

    return res.status(201).json({
      success: true,
      message:
        "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | PUT /api/blog/admin/:id
 * |--------------------------------------------------------------------------
 * | Admin - Update blog
 * |--------------------------------------------------------------------------
 */

export async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(
      req.params.id,
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const existing =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      slug,
      type,
      excerpt,
      content,
      image,
      documentUrl,
      date,
      location,
      tags,
      personName,
      personRole,
      eventName,
      link,
      isPublished,
    } = req.body;

    /**
     * Update object
     */
    const data: any = {};

    /**
     * Title
     */
    if (title !== undefined) {
      const titleString =
        normalizeRequiredString(
          title,
        );

      if (!titleString) {
        return res.status(400).json({
          success: false,
          message:
            "Title cannot be empty",
        });
      }

      data.title = titleString;
    }

    /**
     * Type
     */
    if (type !== undefined) {
      if (!isValidBlogType(type)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid blog type",
          allowedTypes:
            BLOG_TYPES,
        });
      }

      data.type = type;
    }

    /**
     * Slug
     */
    if (slug !== undefined) {
      const slugString =
        normalizeRequiredString(
          slug,
        );

      if (!slugString) {
        return res.status(400).json({
          success: false,
          message:
            "Slug cannot be empty",
        });
      }

      const newSlug =
        slugify(slugString);

      const slugExists =
        await prisma.blogPost.findFirst({
          where: {
            slug: newSlug,
            NOT: {
              id,
            },
          },
        });

      if (slugExists) {
        return res.status(409).json({
          success: false,
          message:
            "Blog slug already exists",
        });
      }

      data.slug = newSlug;
    }

    /**
     * Automatically update slug
     * when title changes and slug
     * wasn't explicitly provided.
     */
    if (
      title !== undefined &&
      slug === undefined
    ) {
      data.slug =
        await generateUniqueSlug(
          normalizeRequiredString(
            title,
          ),
            id,
          );
    }

    /**
     * Optional fields
     */
    if (excerpt !== undefined) {
      data.excerpt =
        normalizeString(excerpt);
    }

    if (content !== undefined) {
      data.content =
        normalizeString(content);
    }

    if (image !== undefined) {
      data.image =
        normalizeString(image);
    }

    /**
     * IMPORTANT:
     * Supports Newsletter /
     * Press Release PDF URL.
     */
    if (documentUrl !== undefined) {
      data.documentUrl =
        normalizeString(
          documentUrl,
        );
    }

    if (location !== undefined) {
      data.location =
        normalizeString(location);
    }

    if (personName !== undefined) {
      data.personName =
        normalizeString(
          personName,
        );
    }

    if (personRole !== undefined) {
      data.personRole =
        normalizeString(
          personRole,
        );
    }

    if (eventName !== undefined) {
      data.eventName =
        normalizeString(
          eventName,
        );
    }

    if (link !== undefined) {
      data.link =
        normalizeString(link);
    }

    /**
     * Date
     */
    if (date !== undefined) {
      const parsedDate =
        parseDate(date);

      if (!parsedDate) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid date",
        });
      }

      data.date =
        parsedDate;
    }

    /**
     * Tags
     */
    if (tags !== undefined) {
      data.tags =
        normalizeTags(tags);
    }

    /**
     * Published status
     */
    if (isPublished !== undefined) {
      const published =
        parseBoolean(
          isPublished,
        );

      if (published === null) {
        return res.status(400).json({
          success: false,
          message:
            "isPublished must be true or false",
        });
      }

      data.isPublished =
        published;
    }

    /**
     * Update
     */
    const blog =
      await prisma.blogPost.update({
        where: {
          id,
        },
        data,
      });

    return res.status(200).json({
      success: true,
      message:
        "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | DELETE /api/blog/admin/:id
 * |--------------------------------------------------------------------------
 * | Admin - Delete blog
 * |--------------------------------------------------------------------------
 */

export async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(
      req.params.id,
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const existing =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await prisma.blogPost.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | PATCH /api/blog/admin/:id/status
 * |--------------------------------------------------------------------------
 * | Admin - Publish / Unpublish
 * |--------------------------------------------------------------------------
 */

export async function updateBlogStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseId(
      req.params.id,
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const {
      isPublished,
    } = req.body;

    if (
      typeof isPublished !==
      "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "isPublished must be boolean",
      });
    }

    const existing =
      await prisma.blogPost.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const blog =
      await prisma.blogPost.update({
        where: {
          id,
        },
        data: {
          isPublished,
        },
      });

    return res.status(200).json({
      success: true,
      message: isPublished
        ? "Blog published successfully"
        : "Blog unpublished successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * |--------------------------------------------------------------------------
 * | GET /api/blog/admin/types
 * |--------------------------------------------------------------------------
 * | Admin - Get available blog types
 * |--------------------------------------------------------------------------
 */

export async function getBlogTypes(
  _req: Request,
  res: Response,
) {
  return res.status(200).json({
    success: true,
    data: BLOG_TYPES,
  });
}