import { prisma } from "@/lib/prisma";

type GetAuditLogsParams = {
  search?: string;
  module?: string;
  page?: number;
  pageSize?: number;
};

export async function getAuditLogs({
  search = "",
  module = "",
  page = 1,
  pageSize = 10,
}: GetAuditLogsParams = {}) {
  const where = {
    ...(module
      ? {
          module,
        }
      : {}),
    ...(search
      ? {
          OR: [
            {
              description: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              action: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              module: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              user: {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            },
          ],
        }
      : {}),
  };

  const [logs, total] = await prisma.$transaction([
    prisma.auditLog.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),

    prisma.auditLog.count({
      where,
    }),
  ]);

  return {
    logs,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}
export async function getAuditModules() {
  const modules = await prisma.auditLog.findMany({
    distinct: ["module"],
    select: {
      module: true,
    },
    orderBy: {
      module: "asc",
    },
  });

  return modules.map((item) => item.module);
}